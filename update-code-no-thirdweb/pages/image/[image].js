import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import {
  Card,
  Header,
  Footer,
  Notification,
  Logo,
  Product,
} from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const imageDetail = () => {
  const {
    address,
    getUploadedImages,
    setloading,
    loading,
    donateFund,
    singleImage,
  } = useStateContext();

  //URL QUERY
  const router = useRouter();
  const { query } = router;

  const [allImages, setAllImages] = useState([]);
  const [notification, setNotification] = useState("");
  const [support, setSupport] = useState("");
  const [image, setImage] = useState();

  const fetchImages = async () => {
    const oneImage = await singleImage(query.image * 1);
    const images = await getUploadedImages();
    setAllImages(images);
    setImage(oneImage);
    console.log(oneImage);
  };
  useEffect(() => {
    fetchImages();
  }, [address]);

  const donateAmount = async () => {
    setloading(true);
    await donateFund({
      amount: ethers.utils.parseUnits(support, 18),
      Id: query.image,
    });
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />

      {image == undefined ? (
        <Logo />
      ) : (
        <Product
          setloading={setloading}
          donateAmount={donateAmount}
          setNotification={setNotification}
          setSupport={setSupport}
          image={image}
        />
      )}
      <div className="card">
        {allImages
          .map((image, i) => (
            <Card
              key={i + 1}
              index={i}
              image={image}
              setNotification={setNotification}
            />
          ))
          .slice(0, 8)}
      </div>

      <Footer />
      {/* //NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* //LOADER */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default imageDetail;
