import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import axios from 'axios';
import { MoveLeft, Github, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const TemplatePage = () => {
  const [templateInfo, setTemplateInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!id) {
      return;
    }
    axios.get('/api/template?id=' + id)
      .then(response => setTemplateInfo(response.data))
      .catch(error => console.error('Template fetch failed:', error))
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!templateInfo) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Template not found</h1>
        <p className="mt-2 text-muted-foreground">The template you are looking for does not exist or has been removed.</p>
        <Link className="mt-6 inline-block font-medium text-primary hover:underline" href="/">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar Specs */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs lg:sticky lg:top-24 lg:h-fit">
            <Link
              href={'/'}
              className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <MoveLeft className="mr-2" size={16} />
              Back to templates
            </Link>

            <div className="flex items-center gap-3 pb-6 border-b border-border">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage
                  src={typeof templateInfo?.user === 'object' ? templateInfo?.user?.image : ''}
                  alt={typeof templateInfo?.user === 'object' ? templateInfo?.user?.name : 'Developer'}
                />
              </Avatar>
              <div>
                <span className="text-xs text-muted-foreground">Uploaded by</span>
                <h3 className="text-sm font-semibold text-foreground">
                  {typeof templateInfo?.user === 'object' ? templateInfo?.user?.name : 'Developer'}
                </h3>
              </div>
            </div>

            <h1 className="my-5 text-2xl font-bold tracking-tight text-foreground">
              {templateInfo?.title}
            </h1>

            <div className="space-y-3 py-2 border-b border-border text-sm">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-muted-foreground">Framework</span>
                <span className="font-semibold text-foreground px-2 py-0.5 rounded-md bg-muted text-xs">
                  {templateInfo?.framework || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-muted-foreground">CSS / Styling</span>
                <span className="font-semibold text-foreground px-2 py-0.5 rounded-md bg-muted text-xs">
                  {templateInfo?.css || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-muted-foreground">Use Case</span>
                <span className="font-semibold text-foreground px-2 py-0.5 rounded-md bg-muted text-xs">
                  {templateInfo?.usecase || 'N/A'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
              {templateInfo?.deployedlink && (
                <a
                  href={templateInfo.deployedlink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2">
                    <Globe size={16} /> Live Preview
                  </Button>
                </a>
              )}
              {templateInfo?.githubrepolink && (
                <a
                  href={templateInfo.githubrepolink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2" variant="outline">
                    <Github size={16} /> View Code
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Main Content & Carousel */}
          <div className="w-full lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs">
              {templateInfo?.images?.length > 0 && (
                <Carousel className="relative w-full mb-8">
                  <CarouselContent>
                    {templateInfo.images.map((img, idx) => (
                      <CarouselItem key={img || idx}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border">
                          <Image
                            src={img}
                            alt={`${templateInfo?.title || 'Template'} preview ${idx + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 66vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {templateInfo.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border shadow-md rounded-full text-foreground backdrop-blur-sm" />
                      <CarouselNext className="absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border shadow-md rounded-full text-foreground backdrop-blur-sm" />
                    </>
                  )}
                </Carousel>
              )}

              <div className="border-t border-border/60 pt-6">
                <h3 className="text-lg font-bold text-foreground mb-4">About this template</h3>
                <div
                  className="template-rich-text text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: templateInfo?.description || '<p>No description provided.</p>' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TemplatePage;
