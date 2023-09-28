import React from 'react';

function PG2() {
    const photos = [
        { id: 1, src: 'A.jpg', alt: 'Drug', description: 'Drug Addict', url: '/Drug' },
        { id: 2, src: 'B.jpg', alt: 'Gaming', description: 'Gaming Addict', url: '/Drug' },
        { id: 3, src: 'C.jpg', alt: 'Smoking', description: 'Smoking Addict',  url: '/Drug' },
        { id: 4, src: 'D.jpg', alt: 'Eating', description: 'Eating Disorder',  url: '/Drug' },
        { id: 5, src: 'E.jpg', alt: 'Alcohol', description: 'Alcohol Addict', url: '/Drug' },
       
      ];
  return (
    <div className="photo-grid2">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <a href={photo.url}>
            <img src={photo.src} alt={photo.alt} />
           </a>
          <p>{photo.description}</p>
        </div>
))}
    </div>
  );
}

export default PG2;