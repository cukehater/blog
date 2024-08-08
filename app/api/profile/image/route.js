import aws from 'aws-sdk'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const fileName = req.nextUrl.searchParams.get('file')

  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: 'ap-northeast-2',
    signatureVersion: 'v4'
  })

  const s3 = new aws.S3()
  const folderName = 'profile/' // 특정 폴더 이름 지정
  const key = `${folderName}${fileName}` // 폴더와 파일 이름 결합

  const url = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: { key }, // 수정된 key 사용
    Expires: 60, // 초 단위
    Conditions: [
      ['content-length-range', 0, 1048576] // 파일 크기 1MB로 제한
    ]
  })

  return NextResponse.json({ message: '성공', url }, { status: 200 })
}
