// @flow

import React from 'react';
// types
import type { Node } from 'react';

// --- contexts
export const ArticlesContext = React.createContext();

// --- components
type Props = {
  children: Node,
};

type State = {
  articles: Array<{
    time: number,
    title: string,
    desc: string,
    blocks: Array<{
      time: number,
      title: string,
      desc: string,
      body: string,
    }>,
  }>,
};

export class ArticlesProvider extends React.Component<Props, State> {
  addArticle: () => void;
  removeArticle: (number) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      articles: [],
      /* -------------------------------------------------------------------- */
      /* temporary */
      /* -------------------------------------------------------------------- */
      articles: [
        {
          time: new Date().getTime(),
          title: '(title)',
          desc: '(description)',
          blocks: [
            {
              time: new Date().getTime(),
              title: '',
              desc: '',
              body: '',
            },
          ],
        },
      ],
      /* -------------------------------------------------------------------- */
      /* temporary */
      /* -------------------------------------------------------------------- */
    };

    this.addArticle = () => {
      this.setState((prevState) => ({
        articles: prevState.articles.concat({
          time: new Date().getTime(),
          title: '',
          desc: '',
          blocks: [
            {
              time: new Date().getTime(),
              title: '',
              desc: '',
              body: '',
            },
          ],
        }),
      }));
    };

    this.removeArticle = (createdAt) => {
      this.setState((prevState) => ({
        articles: prevState.articles.filter(
          (article) => article.time !== createdAt,
        ),
      }));
    };
  }

  render() {
    return (
      <ArticlesContext.Provider
        value={{
          ...this.state,
          addArticle: this.addArticle,
          removeArticle: this.removeArticle,
        }}
      >
        {this.props.children}
      </ArticlesContext.Provider>
    );
  }
}
