interface LogoProps {
    src: string;
    className?: string;
    alt: string;
    href?: string;
}

export const Logo = ({ src, className, alt, href }: LogoProps) => {
    const image = <img src={src} className={className} alt={alt} />;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer">
                {image}
            </a>
        );
    }

    return image;
};
