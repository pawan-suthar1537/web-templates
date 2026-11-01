import { ExternalLink, SquareDot, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import axios from 'axios';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

const Templates = ({ onReady }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let active = true;

    axios.get('/api/template')
      .then(response => {
        const nextTemplates = Array.isArray(response.data) ? response.data : [];
        if (!active) return;
        setTemplates(nextTemplates);
        setLoading(false);
        onReady?.(nextTemplates.length > 0);
      })
      .catch(error => {
        console.error("Error fetching templates:", error);
        if (!active) return;
        setTemplates([]);
        setLoading(false);
        onReady?.(false);
      });

    return () => {
      active = false;
    };
  }, [onReady]);

  const filterTemplates = templates.filter(template => {
    const query = searchQuery.toLowerCase();
    const userName = typeof template.user === 'string'
      ? template.user
      : template.user?.name || '';
    return (
      (template.title || '').toLowerCase().includes(query) ||
      (template.framework || '').toLowerCase().includes(query) ||
      userName.toLowerCase().includes(query) ||
      (template.usecase || '').toLowerCase().includes(query)
    );
  });

  const featuredTemplates = filterTemplates.slice(0, 8);

  const getUserImage = (user) => {
    if (!user) return 'https://ui-avatars.com/api/?name=User&background=0f172a&color=fff';
    if (typeof user === 'string') return 'https://ui-avatars.com/api/?name=User&background=0f172a&color=fff';
    return user.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&background=0f172a&color=fff';
  };

  const getUserName = (user) => {
    if (!user) return 'Unknown';
    if (typeof user === 'string') return 'Developer';
    return user.name || 'Developer';
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <SquareDot className='text-indigo-600' size={22} />
          <h3 className="text-xl font-bold">Latest Templates</h3>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder='Search templates...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-full border-border"
          />
        </div>
      </div>

      {(loading && templates.length === 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className='h-[200px] w-full rounded-2xl' />
              <div className="space-y-2">
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && templates.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No templates available yet.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredTemplates.map(template => (
          <div
            data-showcase-item
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            key={template._id || template.id}
          >
            <Link href={'/templates/' + template._id}>
              <div className="relative h-[200px] w-full overflow-hidden bg-muted">
                <Image
                  alt={template.title || 'template'}
                  src={template.images?.[0] || 'https://picsum.photos/seed/placeholder/800/600'}
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={80}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    height={28}
                    width={28}
                    src={getUserImage(template.user)}
                    alt="user"
                    className='h-7 w-7 rounded-full border border-border'
                  />
                  <span className="text-xs text-muted-foreground font-medium truncate">
                    {getUserName(template.user)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                  {template.title}
                </h3>
              </div>
            </Link>
            <div className="border-t border-border px-4 py-3 flex justify-between items-center">
              <span className='text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md'>
                {template.framework}
              </span>
              {template.deployedlink && (
                <a href={template.deployedlink} target='_blank' rel="noreferrer" aria-label={`Open live preview for ${template.title}`} className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
