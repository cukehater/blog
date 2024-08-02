import InnerCol from '@/app/shared/components/InnerCol'
import List from '@/app/features/list/List'
import { listData } from '@/app/data'
import ModalConfirm from '../shared/components/ModalConfirm'

export default function page() {
  return (
    <>
      <main>
        <InnerCol className='flex-1 flex flex-col items-center justify-center'>
          <List listData={listData} isTemp={true} />
        </InnerCol>
      </main>
    </>
  )
}
