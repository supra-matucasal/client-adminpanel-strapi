export function Card({ imageSrc, title, description, link }) {
  return (
    <div className="rounded-lg w-full group shadow-lg h-48">
      <a href={link || '#'} className="h-full block bg-ultraLightGray rounded-b-lg no-underline text-black">
        {imageSrc && (
          <img
            alt={title || 'Image'}
            className="rounded-t-lg w-full h-full object-cover"
            src={imageSrc}
          />
        )}
        <div className="px-8 py-6 bg-gray-100 min-h-[120px]">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </a>
    </div>
  );
}
