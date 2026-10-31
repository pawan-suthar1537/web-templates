import Spinner from '@/components/Spinner';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import axios from 'axios';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const TemplatePage = () => {
  const [templateInfo, setTemplateInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    if (!id) {
      return
    }
    axios.get('/api/template?id=' + id)
      .then(response => setTemplateInfo(response.data))
      .catch(error => console.error('Template fetch failed:', error))
      .finally(() => setLoading(false));

  }, [id]);


  if (loading) {
    return <>
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    </>
  }

  if (!templateInfo) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-2xl font-bold">Template not found</h1><Link className="mt-4 inline-block text-primary hover:underline" href="/">Return home</Link></div>;
  }

  return <>
    <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs lg:sticky lg:top-24 lg:h-fit">
            <Link href={'/'} className='mb-5 flex items-center text-sm text-muted-foreground hover:text-foreground'>
              <MoveLeft className='mr-2' />
              Go back
            </Link>
            <Badge variant={'outline'} className={'flex items-center justify-start gap-2 px-3 py-2'}>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={typeof templateInfo?.user === 'object' ? templateInfo?.user?.image : ''} alt={typeof templateInfo?.user === 'object' ? templateInfo?.user?.name : 'Developer'} />
              </Avatar>
              <h1 className="text-sm font-semibold text-foreground">
                {typeof templateInfo?.user === 'object' ? templateInfo?.user?.name : 'Developer'}
              </h1>
            </Badge>
            <h2 className="my-6 text-2xl font-semibold">
              {templateInfo?.title}
            </h2>
            <div className="flex justify-between border-b border-border p-3 text-sm">
              <p className="font-medium">Framework</p>
              <p className="text-muted-foreground">{templateInfo?.framework}</p>
            </div>
            <div className="flex justify-between border-b border-border p-3 text-sm">
              <p className="font-medium">Use Case</p>
              <p className="text-muted-foreground">{templateInfo?.usecase}</p>
            </div>
            <div className="flex justify-between border-b border-border p-3 text-sm">
              <p className="font-medium">CSS</p>
              <p className="text-muted-foreground">{templateInfo?.css}</p>
            </div>

            <div className="mt-6 flex gap-3 text-center">
              <a href={templateInfo?.githubrepolink} target='_blank' rel="noreferrer" className="flex-1">
                <Button className="w-full" variant='outline'>
                  View Code
                </Button>
              </a>
              <a href={templateInfo?.deployedlink} target='_blank' rel="noreferrer" className="flex-1">
                <Button className="w-full">
                  Live Preview
                </Button>
              </a>
            </div>
          </div>
          <div className="w-full lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-xs sm:p-6">
              <Carousel className='col-span-2'>
                <CarouselContent>
                  {(templateInfo?.images || []).map((img) => (
                    <CarouselItem key={img}>
                      <Image
                        src={img}
                        alt='temp image'
                        width={707}
                        height={400}
                         style={{ width: '100%', height: 'auto' }}
                        quality={100}
                         className='mb-6 mt-2 w-full rounded-xl object-cover shadow-sm'
                      />

                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 cursor-pointer' />
                <CarouselNext className='absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 cursor-pointer' />
              </Carousel>
              <div className="prose max-w-none text-muted-foreground" dangerouslySetInnerHTML={{__html: templateInfo?.description}}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
}

export default TemplatePage
