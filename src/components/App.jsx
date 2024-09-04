import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { responseAxios } from 'api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    input: '',
    images: [],
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state;
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

  render() {
    return (
      <div>
        <Searchbar search={this.searchInput} />
        {this.state.images.length > 0 && <ImageGallery />}
        <Toaster position="top-right" />
      </div>
    );
  }
}
