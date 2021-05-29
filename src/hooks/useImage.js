import axios from "axios";
import { useEffect, useState } from "react";

export const useImages = () => {
  const SEARCH =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1";
  const RECENTS =
    "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&nojsoncallback=1";
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [uri, setUri] = useState(RECENTS);
  const [query, setQuery] = useState("");

  var cancel;
  const fetchData = async () => {
    const { data } = await axios.get(uri, {
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        page,
        text: query,
        per_page: "20",
        format: "json",
      },
    });
    cancel();
    if (data.photos) {
      setImages((prevImages) => [...prevImages, ...data.photos.photo]);
    }
  };
  useEffect(() => {
    fetchData();
    return () => cancel();
  }, [page, query, uri]);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setUri(RECENTS);
    } else {
      setUri(SEARCH);
    }
    setImages([]);
    setQuery(value);
    setPage(1);
  };

  const handleSubmit = (enquiry) => {
    setImages([]);
    setQuery(enquiry);
    setPage(1);
    fetchData();
  };

  return { images, handleSearch, setPage, handleSubmit };
};
