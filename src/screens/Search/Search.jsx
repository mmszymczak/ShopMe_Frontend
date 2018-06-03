import React from 'react';
import FoundSearchResults from 'components/Search/SearchResults/FoundSearchResults/FoundSearchResults';
import NoSearchResults from 'components/Search/SearchResults/NoSearchResults/NoSearchResults';
import { Redirect } from 'react-router';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    const searchQueryValue = new URLSearchParams(props.location.search);
    const category = searchQueryValue.get('category');
    const phrase = searchQueryValue.get('title');
    const page = searchQueryValue.get('page') ? searchQueryValue.get('page') : 1;

    this.state = {
      foundServices: [],
      notFoundServices: null,
      phrase,
      isValidPhrase: false,
      paginationData: {},
      triggerFetchAfterValidate: !!phrase,
      fireRedirect: false,
      page,
      category,
    };
    this.updateFoundServices = this.updateFoundServices.bind(this);
    this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.category !== nextProps.location.category ||
      this.props.location.search !== nextProps.location.search) {
      const getDataWithReceivedProps = this.getData.bind(this);
      const searchQueryValue = new URLSearchParams(nextProps.location.search);
      const category = searchQueryValue.get('category');

      this.setState({
        category,
        paginationData: { pageNumber: 1 },
        page: 1,
        phrase: searchQueryValue.get('title'),
      }, getDataWithReceivedProps);
    }
  }

  onSubmit() {
    if (!this.state.isValidPhrase) return;

    this.setState({ paginationData: { pageNumber: 1 }, page: 1, fireRedirect: true }, () => {
      this.setState({ fireRedirect: false });
      this.getData();
    });
  }

  getData() {
    const { http } = this.props;
    const { category } = this.state;
    const title = this.state.phrase;
    const [page] = [this.state.page];

    let params;
    if (!category) {
      params = { title, page };
    } else if (title) {
      params = { title, page, category };
    } else {
      params = { category, page };
    }

    return http.get('/api/offers', params)
      .then((services) => {
        if (!services) return;
        if (services.content) {
          this.setState({
            foundServices: services.content,
            notFoundServices: false,
            paginationData: {
              totalPages: services.totalPages,
              pageNumber: services.number + 1,
            },
          });
        } else {
          this.setState({ notFoundServices: true });
        }
      });
  }

  updateFoundServices(foundServices) {
    if (foundServices.content) {
      this.setState({
        foundServices: foundServices.content,
        notFoundServices: false,
        paginationData: {
          totalPages: foundServices.totalPages,
          pageNumber: foundServices.number + 1,
        },
      });
    } else {
      this.setState({ notFoundServices: true });
    }
  }

  updateSearchPhrase(phrase, isValidPhrase) {
    let cb;
    let triggerFetchAfterValidate = this.state && this.state.triggerFetchAfterValidate;
    if (this.state.triggerFetchAfterValidate && this.state.isValidPhrase) {
      cb = this.getData.bind(this);
      triggerFetchAfterValidate = false;
    }
    this.setState({
      phrase,
      isValidPhrase,
      triggerFetchAfterValidate,
    }, cb);
  }

  updatePage(page) {
    this.setState({
      paginationData: {
        pageNumber: page,
        totalPages: this.state.paginationData.totalPages,
      },
      page,
      fireRedirect: true,
    }, () => {
      this.setState({ fireRedirect: false });
      this.getData();
    });
  }

  render() {
    if (this.state.fireRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/search',
            search: this.state.category
              ? `?category=${this.state.category}&title=${this.state.phrase}&page=${this.state.paginationData.pageNumber}`
              : `?title=${this.state.phrase}&page=${this.state.paginationData.pageNumber}`,
          }}
        />
      );
    }
    let results;
    if (this.state.notFoundServices === false) {
      results = (<FoundSearchResults
        services={this.state.foundServices}
        updateFoundServices={this.updateFoundServices}
        phrase={this.state.phrase}
        paginationData={this.state.paginationData}
        updatePage={this.updatePage}
      />);
    } else if (this.state.notFoundServices === true) {
      results = (<NoSearchResults />);
    } else {
      results = ('');
    }
    return (
      <div>
        {results}
      </div>
    );
  }
}
