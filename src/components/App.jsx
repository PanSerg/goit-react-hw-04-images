import { useEffect, useState } from "react";
import getImages from "services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Btn } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { AppStyled } from "App.Styled";

export function App() {
  const [card, setCard] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getImages(inputValue, page)
      .then(({ hits, totalHits }) => {
        setCard(prevState => [...prevState, ...hits]);
          setShowBtn(page <Math.ceil(totalHits / 12)) 
        })
      .catch(error => {
        setPage(error)
      .finally(() => {
         setIsLoading(false);
      })
    })
  }, [inputValue, page]);

    const findImage = e => {
      if (e.search === '') {
        alert('Error')
      } else {
        setPage(1);
        setInputValue(e.search);
        setCard([]);
        setIsLoading(true)
      }
  };
  
   const addPages = () => {
    setPage(page + 1 )
  };

    return (
      <AppStyled>
        <Searchbar onSubmit={findImage} />
        <ImageGallery img={card} />
        {showBtn && isLoading === false && <Btn addPages={addPages} />}
        {isLoading !== false && (<Loader/>)}
      </AppStyled>
    );
  };