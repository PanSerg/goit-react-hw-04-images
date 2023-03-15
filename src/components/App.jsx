import { useEffect, useState } from "react";
import getImages from "services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Btn } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { AppStyled } from "App.Styled";

export function App() {
  const [card, setCard] = useState([]);
  const [inputValue, setInputValue] = useState(null),
  const [page, setPage] = useState(1),
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn] = useState(false);

  useEffect(() => {
    setStatus(isLoading.true)

      .catch(error => {
        setError(error);
        setStatus()
      .finally(() => {
        isLoading.false
      })
    })
  });

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page ||
      prevState.inputValue !== this.state.inputValue) {

      this.setState({ isLoading: true });

      getImages(this.state.inputValue, this.state.page)
        .then(cards =>
          this.setState(prev => ({
            card: [...prev.card, ...cards.hits],
          showBtn: this.state.page < Math.ceil(cards.totalHits / 12)
        })))
        .catch(error => console.log(error))
        .finally(()=> this.setState({ isLoading: false}));
    }
  };

  findImage = e => {
    this.setState({ card: [], page: 1, inputValue: e.search });
  };

  addPages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  };

  
    return (
      <AppStyled>
        <Searchbar onSubmit={this.findImage} />
        <ImageGallery img={card} />
        {showBtn && isLoading === false && <Btn addPages={this.addPages} />}
        {isLoading !== false && (<Loader/>)}
      </AppStyled>
    );
  };
