import React from "react";
import { Center, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageComponent from "../src/ImageComponent";
import { useImages } from "../src/hooks/useImage";
import Header from "../src/Components/Header";

const index = () => {
  const { images, handleSearch, setPage, handleSubmit } = useImages();
  return (
    <>
      <Header handleSearch={handleSearch} handleSubmit={handleSubmit} />

      {images.length === 0 ? (
        <Center h="full" my="10">
          <Spinner />
        </Center>
      ) : (
        <InfiniteScroll
          loader={<Spinner />}
          dataLength={images.length}
          hasMore={true}
          next={() => setPage((prevpage) => prevpage + 1)}
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              750: 2,
              900: 3,
              1200: 4,
              1500: 5,
            }}
          >
            <Masonry>
              {images.map((item, index) => (
                <ImageComponent
                  title={item.title}
                  src={
                    "https://live.staticflickr.com/" +
                    item.server +
                    "/" +
                    item.id +
                    "_" +
                    item.secret +
                    ".jpg"
                  }
                  key={index}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      )}
    </>
  );
};

export default index;
