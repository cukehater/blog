'use client'

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'

import axios from 'axios'
import { ExposeParam, MdEditor } from 'md-editor-rt'
import { useRouter, useSearchParams } from 'next/navigation'
import { v4 as uuid } from 'uuid'

import 'md-editor-rt/lib/style.css'
import '@/app/styles/md-editor.scss'

import Button from '@/app/components/Button'
import CategoryButton from '@/app/components/CategoryButton'
import ModalAlert from '@/app/components/ModalAlert'
import ModalConfirm from '@/app/components/ModalConfirm'
import Snackbar from '@/app/components/Snackbar'
import ArrowSvg from '@/app/components/svg/ArrowSvg'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'
import { PostType } from '@/app/models/posts'

import ModalPortal from '@/app/components/layout/ModalPortal'

import { createSupabaseClient } from '@/app/utils/createSupabaseClient'
import getKoreaTimeString from '@/app/utils/getKoreaTimeString'

function CategoryInput({
  setWriteData,
  categories
}: {
  setWriteData: Dispatch<SetStateAction<Omit<PostType, '_id'>>>
  categories: string[]
}) {
  const [value, setValue] = useState('')

  const checkValid = (inputValue: string) => {
    setValue('')

    if (categories.length >= 5) return false
    if (categories.includes(inputValue)) return false
    if (inputValue.trim() === '') return false

    return true
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && checkValid(value)) {
      setWriteData((prev) => ({
        ...prev,
        categories: [...prev.categories, value.trim()]
      }))
    }
  }

  const handleBlur = () => {
    if (checkValid(value)) {
      setWriteData((prev) => ({
        ...prev,
        categories: [...prev.categories, value.trim()]
      }))
    }
  }

  const handleRemoveCategory = (category: string) => {
    setWriteData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category)
    }))
  }

  return (
    <section className="flex flex-wrap gap-2 px-6 py-4">
      {categories.map((category) => (
        <CategoryButton
          key={uuid()}
          name={category}
          onRemoveCategory={handleRemoveCategory}
        />
      ))}
      <input
        type="text"
        className="block w-40 bg-transparent"
        placeholder="태그를 입력해 주세요"
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </section>
  )
}

function Editor({
  content,
  setWriteData,
  onSave
}: {
  content: string
  setWriteData: Dispatch<SetStateAction<Omit<PostType, '_id'>>>
  onSave: () => void
}) {
  const editorRef = useRef<ExposeParam>(null)
  const [width, setWidth] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleContentChange = (value: string) => {
    setWriteData((prev) => ({ ...prev, content: value }))
  }

  useEffect(() => {
    setWidth(window.innerWidth)

    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  useEffect(() => {
    editorRef.current?.togglePreview(width > 480)
  }, [width])

  return isMounted ? (
    <MdEditor
      ref={editorRef}
      language="en-US"
      className="flex-1"
      modelValue={content}
      onChange={handleContentChange}
      onSave={onSave}
      onUploadImg={async (
        files: File[],
        callback: (urls: string[]) => void
      ) => {
        const uploadPromises = files.map(async (file) => {
          await createSupabaseClient.storage
            .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!)
            .upload(`posts/${file.name}`, file)

          const {
            data: { publicUrl }
          } = createSupabaseClient.storage
            .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!)
            .getPublicUrl(`posts/${file.name}`)

          return publicUrl
        })

        const uploadedUrls = await Promise.all(uploadPromises)

        callback(uploadedUrls)
      }}
      theme="dark"
      preview={false}
      footers={['markdownTotal']}
    />
  ) : null
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const postId = searchParams.get('id')
  const isEdit = searchParams.get('edit') === 'true'

  const [writeData, setWriteData] = useState<Omit<PostType, '_id'>>({
    title: '',
    description: '',
    content: '',
    regDate: getKoreaTimeString(),
    categories: []
  })

  const [isConfirmModalOpen, toggleConfirmModalOpen] = useReducer(
    (prev) => !prev,
    false
  )
  const [isAlertModalOpen, toggleAlertModalOpen] = useReducer(
    (prev) => !prev,
    false
  )

  const { isShowSnackbar, showSnackbar } = useCallSnackbar()

  const fetchData = useCallback(async () => {
    if (!postId) return

    const { data } = await axios.get(
      `/api/${isEdit ? 'posts' : 'drafts'}?id=${postId}`
    )

    if (!data.data) {
      // eslint-disable-next-line no-alert
      window.alert('존재하지 않는 포스트입니다')
      router.push('/')
      return
    }

    const { _id: id, ...dataWithoutId } = data.data
    setWriteData(dataWithoutId)
  }, [postId, isEdit, router])

  const postValidCheck = () => {
    if (writeData.title.trim() === '') return false
    if (writeData.description.trim() === '') return false
    if (writeData.content.trim() === '') return false
    return true
  }

  const handleSave = async () => {
    if (!postValidCheck()) {
      toggleAlertModalOpen()
      return
    }

    if (!postId) {
      // 첫 작성일 경우
      const { data } = await axios.post('/api/drafts', writeData)
      const insertedId = data?.data?.toString()
      router.push(`/write?id=${insertedId}`)
    } else {
      // 임시저장 수정
      await axios.put('/api/drafts', {
        _id: postId,
        ...writeData
      })
    }
    showSnackbar()
  }

  const handlePublish = async () => {
    await axios.post('/api/posts', writeData)

    if (postId) {
      await axios.delete('/api/drafts', { data: { id: postId } })
    }

    router.push('/')
  }

  const handleUpdate = async () => {
    await axios.put('/api/posts', { id: postId, ...writeData })
    router.push('/')
  }

  const handleValidCheckBeforeConfirm = () => {
    if (!postValidCheck()) {
      toggleAlertModalOpen()
      return
    }
    toggleConfirmModalOpen()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="flex flex-col min-h-screen">
      {/* 뒤로가기, 임시저장, 발행 */}
      <section className="flex items-center justify-between p-4 border-[--tertiary-color] border-b-2">
        <nav className="flex items-center w-full gap-2">
          <Button
            type="button"
            highlight
            className="flex gap-2 items-center"
            onClick={() => router.push('/drafts')}
          >
            <ArrowSvg className="w-4 h-4" />
            돌아가기
          </Button>

          <input
            type="date"
            className="px-2 py-1 ml-auto text-sm text-black rounded-md"
            onChange={(e) =>
              setWriteData((prev) => {
                return {
                  ...prev,
                  regDate: prev.regDate.replace(
                    prev.regDate.slice(0, 10),
                    e.target.value
                  )
                }
              })
            }
            value={writeData.regDate.slice(0, 10)}
          />

          {isEdit ? (
            <Button
              type="button"
              highlight
              onClick={handleValidCheckBeforeConfirm}
            >
              수정
            </Button>
          ) : (
            <>
              <Button type="button" onClick={handleSave}>
                임시저장
              </Button>

              <Button
                type="button"
                highlight
                onClick={handleValidCheckBeforeConfirm}
              >
                발행
              </Button>
            </>
          )}
        </nav>
      </section>

      {/* 제목, 내용 */}
      <section className="px-4 pt-4">
        <input
          type="text"
          className="w-full text-2xl bg-transparent mb-4 font-semibold border-b-4 border-[var(--secondary-color)] pb-4 px-2 placeholder-gray-400"
          placeholder="제목을 입력해 주세요"
          defaultValue={writeData.title}
          onChange={(e) =>
            setWriteData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="w-full px-2 bg-transparent resize-none"
          placeholder="포스트에 대한 간략한 내용을 입력해 주세요"
          rows={2}
          defaultValue={writeData.description}
          onChange={(e) =>
            setWriteData((prev) => ({
              ...prev,
              description: e.target.value
            }))
          }
        />
      </section>

      {/* 카테고리 태그 */}
      <CategoryInput
        setWriteData={setWriteData}
        categories={writeData.categories}
      />

      {/* 에디터 영역 */}
      <Editor
        content={writeData.content}
        setWriteData={setWriteData}
        onSave={handleSave}
      />

      {/* 발행 확인 모달 */}
      {isConfirmModalOpen && (
        <ModalPortal>
          <ModalConfirm
            title={`포스트를 ${isEdit ? '수정' : '발행'}하시겠습니까?`}
            confirmText={isEdit ? '수정' : '발행'}
            cancelText="취소"
            onConfirm={() => {
              if (isEdit) {
                handleUpdate()
              } else {
                handlePublish()
              }
            }}
            onCancel={toggleConfirmModalOpen}
          />
        </ModalPortal>
      )}

      {/* 유효성 경고 모달 */}
      {isAlertModalOpen && (
        <ModalPortal>
          <ModalAlert
            title="내용을 입력해 주세요"
            buttonText="확인"
            onClick={toggleAlertModalOpen}
          />
        </ModalPortal>
      )}

      {/* 스낵바 */}
      {isShowSnackbar && (
        <ModalPortal>
          <Snackbar message="포스트가 저장되었습니다" type="success" />
        </ModalPortal>
      )}
    </div>
  )
}
