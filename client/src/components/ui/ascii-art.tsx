interface AsciiArtProps {
  art: string;
  className?: string;
}

export default function AsciiArt({ art, className = "" }: AsciiArtProps) {
  return (
    <pre className={`ascii-art leading-none ${className}`}>
      {art}
    </pre>
  );
}
