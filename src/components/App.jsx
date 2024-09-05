import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { responseAxios } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { CustomModal } from './Modal/Modal';

export class App extends Component {
  state = {
    input: '',
    images: [],
    page: 1,
    modalIsOpen: false,
    webformatURL: '',
    tags: '',
  };

  // componentDidMount() {
  //   const savedLocal = localStorage.getItem('state');
  //   const localState = JSON.parse(savedLocal);
  //   const { input, images, page } = localState;
  //   if (savedLocal !== null) {
  //     this.setState({
  //       input: input,
  //       images: images,
  //       page: page,
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state;

    // if (prevState.state !== this.state) {
    //   localStorage.setItem('state', JSON.stringify(this.state));
    // }

    if (prevState.input !== input || prevState.page !== page) {
      responseAxios(input, page)
        .then(data => {
          if (!data.length) {
            toast.error('No photos found.');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data],
          }));
        })
        .catch(error => {
          toast.error('No photos found.');
        });
    }
  }

  searchInput = e => {
    e.preventDefault();

    this.setState({
      input: e.target.search.value.toLowerCase().trim(),
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = ({ webformatURL, tags }) => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
      webformatURL,
      tags,
    }));
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      webformatURL: '',
    });
  };
  render() {
    const { images, webformatURL, tags, modalIsOpen } = this.state;
    return (
      <div>
        <Searchbar search={this.searchInput} />
        {this.state.images.length > 0 && (
          <ImageGallery openModal={this.openModal} images={images} />
        )}
        {this.state.images.length > 0 && <Button onLoadMore={this.loadMore} />}
        <CustomModal
          closeModal={this.closeModal}
          modalIsOpen={modalIsOpen}
          image={webformatURL}
          tags={tags}
        />
        <Toaster position="top-right" />
      </div>
    );
  }
}
