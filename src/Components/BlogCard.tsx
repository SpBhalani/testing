"use client"
import { CategoryType, blogDataType } from '@/interface/apiInterface';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BlogCardProps {
  blog: blogDataType;
  category?: CategoryType
}

const BlogCard: React.FC<BlogCardProps> = ({ blog , category}) => {
  const router = useRouter()
return (
  <div className="border rounded-2xl overflow-hidden w-full md:w-[48.5%] shadow-xl cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200"
    onClick={() => router.push(`/detailed-blog/${blog._id}`)}
  >
    <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
    <div className="px-5 py-2">
      <p className="text-sm text-gray-400">{category?.categoryName}</p>
      <h5 className="text-2xl font-semibold mb-4">{blog.title}</h5>
      <p className="text-sm text-gray-400">{blog.date}</p>
    </div>
  </div>
);
 
}
export default BlogCard;
