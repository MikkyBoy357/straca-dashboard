import { Blog } from '@/components/dashboard_components/BlogList';
import React from 'react'

interface BlogGridCardProps {
    blog: Blog,
}

const BlogGridCard: React.FC<BlogGridCardProps> = ({ blog }) => {
    const backgroundImage = "https://s3-alpha-sig.figma.com/img/c7b1/f381/9ea47c5a137fb8e448d190c8675d23d8?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gLBZpVMc6jF50TTedQHA717Po~ttOdyFQFPBkEsl4Nu1sjhKSLaXkXqeCaJbGBzoFsGHutyzTaPv3J0ptdArgUZQWYBTYRQ5mhjcFf74rNsykpf8clQmXjELBKLlzUNyOq7~52WCs-3l42bqA4iSCSUvErAl4GMQaNIhUkosn9PaorDui-~5~i0Jxvj~xiZUCE7U7nwFaz-~3G4UW8JCsAyoWDFWfSHCwlFMIUjKgoIITtUUGqPgqZfY7REng2j7Ko-CBwZ7v857riuY6tDgPX6FR8I~BGE4DpBhIX2kieeV8x94QW0QxpJeHzhVAKnrCAgxNxsJNiGH3vB3CnOAQQ__";

    return (
        <div className="flex flex-col w-[258px] px-3 py-4 gap-4 rounded-sm bg-white border border-[#D9D9D9]">
            <div className="h-36 bg-black rounded-sm"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}></div>
            <div className="flex flex-col gap-4 justify-start items-start">
                <div className="px-2 py-1 font-light text-sm bg-[#F6F1DD]">Nouveauté</div>
                <h4 className="font-bold pr-16">{blog.title}</h4>
                <p className="font-light text-sm">{blog.createdAt}</p>
            </div>
        </div>
    )
}

export default BlogGridCard