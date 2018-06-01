import React from 'react';
import { translate } from 'react-i18next';
import MarkdownArticle from 'components/UI/MarkdownArticle/MarkdownArticle';
import AppError from 'components/App/Error/Error';

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    const name = this.props.match.params.article;
    this.fetchContent(name);
  }

  componentWillReceiveProps(nextProps) {
    const name = nextProps.match.params.article;
    this.fetchContent(name);
  }

  fetchContent(name) {
    const { http } = this.props;
    http.get(`/assets/articles/pl/${name}.md`, null, { parse: 'text' })
      .then((article) => {
        this.setState({ content: article });
      });
  }

  render() {
    return this.state.content.includes('<!DOCTYPE html>') ? <AppError /> : <MarkdownArticle source={this.state.content} />;
  }
}

export { ArticleScreen };
export default translate()(ArticleScreen);
