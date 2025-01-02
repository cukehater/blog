'use client'

import { v4 as uuid } from 'uuid'
import Button from '@/app/components/ui/Button'
import CategoryButton from '@/app/components/ui/CategoryButton'
import ArrowSvg from '@/app/components/ui/svg/ArrowSvg'
import { MdEditor } from 'md-editor-rt'
import { useRouter, useSearchParams } from 'next/navigation'
import 'md-editor-rt/lib/style.css'
import '@/app/styles/md-editor.scss'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState
} from 'react'
import parseKoreaDateFormat from '@/app/utils/parseKoreaDateFormat'
import { PostType } from '@/app/models/posts'
import axios from 'axios'
import ModalPortal from '@/app/components/layout/ModalPortal'
import ModalConfirm from '@/app/components/ui/ModalConfirm'
import ModalAlert from '@/app/components/ui/ModalAlert'
import Snackbar from '@/app/components/ui/Snackbar'
import useCallSnackbar from '@/app/hooks/useCallSnackbar'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const postId = searchParams.get('id')
  const isEdit = searchParams.get('edit') === 'true'

  const [writeData, setWriteData] = useState<Omit<PostType, '_id'>>({
    title: '',
    description: '',
    content: '',
    regDate: parseKoreaDateFormat(),
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

  const fetchData = async () => {
    if (!postId) return
    const { data } = await axios.get(
      `/api/${isEdit ? 'posts' : 'drafts'}?id=${postId}`
    )
    const { _id, ...dataWithoutId } = data?.data
    setWriteData(dataWithoutId)
  }

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
    if (!postValidCheck()) {
      toggleAlertModalOpen()
      return
    }

    await axios.post('/api/posts', writeData)

    // 임시저장 글을 발행할 때 임시저장 글 삭제
    if (postId) {
      await axios.delete('/api/drafts', { data: { id: postId } })
    }

    router.push('/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* 뒤로가기, 임시저장, 발행 */}
      <section className="bg-[--tertiary-color] flex items-center justify-between p-4">
        <nav className="flex items-center gap-2 w-full">
          <Button
            type="button"
            className="flex gap-2 items-center [&_path]:hover:fill-[--accent-color] [&_path]:transition-all"
            onClick={() => router.push('/drafts')}
          >
            <ArrowSvg className="w-4 h-4" />
            돌아가기
          </Button>

          <input
            type="date"
            className="text-black text-sm px-2 py-1 rounded-md ml-auto"
            onChange={(e) =>
              setWriteData((prev) => ({
                ...prev,
                regDate: e.target.value
              }))
            }
            defaultValue={writeData.regDate}
          />

          {isEdit ? (
            <Button type="button" highlight onClick={toggleConfirmModalOpen}>
              수정
            </Button>
          ) : (
            <>
              <Button type="button" onClick={handleSave}>
                임시저장
              </Button>

              <Button type="button" highlight onClick={toggleConfirmModalOpen}>
                발행
              </Button>
            </>
          )}
        </nav>
      </section>

      {/* 제목, 내용 */}
      <section className="pt-4 px-4">
        <input
          type="text"
          className="w-full text-2xl bg-transparent mb-4 font-semibold border-b-4 border-[var(--secondary-color)] pb-4 px-2"
          placeholder="제목을 입력해 주세요"
          defaultValue={writeData.title}
          onChange={(e) =>
            setWriteData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="w-full bg-transparent resize-none px-2"
          placeholder="게시글에 대한 간략한 내용을 입력해 주세요"
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
            title="포스트를 발행하시겠습니까?"
            confirmText="발행"
            cancelText="취소"
            onConfirm={handlePublish}
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
        categories: [...prev.categories, value]
      }))
    }
  }

  const handleBlur = () => {
    if (checkValid(value)) {
      setWriteData((prev) => ({
        ...prev,
        categories: [...prev.categories, value]
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
    <section className="flex flex-wrap gap-2 py-4 px-6">
      {categories.map((category) => (
        <CategoryButton
          key={uuid()}
          name={category}
          onRemoveCategory={handleRemoveCategory}
        />
      ))}
      <input
        type="text"
        className="bg-transparent w-40 block"
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
  const handleContentChange = (value: string) => {
    setWriteData((prev) => ({ ...prev, content: value }))
  }

  return (
    <MdEditor
      language="en-US"
      className="flex-1"
      modelValue={content}
      onChange={handleContentChange}
      onSave={() => {
        onSave()
        // displaySnackbar()
      }}
      onUploadImg={async () =>
        // files: File[],
        // callback: (urls: string[]) => void
        {
          // const uploadPromises = files.map(async (file) => {
          //   const { data } = await axios.get(
          //     `/api/upload?file=${file.name}&dir=posts`
          //   )
          //   return uploadToS3(data, file.name, file, 'posts/')
          // })
          // const uploadedUrls = await Promise.all(uploadPromises)
          // callback(uploadedUrls)
        }
      }
      theme="dark"
      footers={['markdownTotal']}
    />
  )
}
