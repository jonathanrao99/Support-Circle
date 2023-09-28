import React from 'react';

function PhotoGrid() {
  const photos = [
    { id: 1, src: '1.jpg', alt: 'Photo 1', description: 'Addiction & Recovery', url: '/Addiction' },
    { id: 2, src: '2.jpg', alt: 'Photo 2', description: 'Cancer',  },
    { id: 3, src: '3.jpg', alt: 'Photo 3', description: 'Self Harm', },
    { id: 4, src: '4.jpg', alt: 'Photo 4', description: 'LGBTQ+ Community',  },
    { id: 5, src: '5.jpg', alt: 'Photo 5', description: 'Social Anxiety',  },
    { id: 6, src: '6.jpg', alt: 'Photo 6', description: 'Grief & Loss',  },
  ];

  return (
    <div className="photo-grid">
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

export default PhotoGrid;