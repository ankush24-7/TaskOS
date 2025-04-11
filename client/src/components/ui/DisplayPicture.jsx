const getCloudinaryProfilePicURL = (publicId, radius) => {
  const dimension = Number(radius.slice(0, -2)) * 2;
  return `https://res.cloudinary.com/dcm0pdfet/image/upload/t_profile${dimension}/${publicId}`;
};


const DisplayPicture = ({ publicId, color, firstName, radius }) => {
  if (publicId) {
    const cloudinaryUrl = getCloudinaryProfilePicURL(publicId, radius);
    return (
      <img
        src={cloudinaryUrl}
        alt="Display"
        className="rounded-full"
        style={{ width: radius, height: radius }}
      />
    );
  }

  return (
    <div
      style={{ backgroundColor: color, width: radius, height: radius }}
      className="rounded-full flex items-center justify-center">
      <p 
        className="text-white"
        style={{ fontSize: `${parseFloat(radius) / 2}px` }}>
        {firstName?.charAt(0).toUpperCase()}
      </p>
    </div>
  );
};

export default DisplayPicture;
