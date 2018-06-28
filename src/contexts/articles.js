// @flow

import React from 'react';
// types
import type { Node } from 'react';
import type { BlockProps } from 'contexts/blocks';

// --- contexts
export const ArticlesContext = React.createContext();

// --- components
type Props = {
  children: Node,
};

export type ArticleProps = {|
  id: string,
  time: number,
  title: string,
  desc: string,
  blocks: Array<BlockProps>,
|};

type State = {
  articles: Array<ArticleProps>,
};

export class ArticlesProvider extends React.Component<Props, State> {
  addArticle: () => void;
  removeArticle: (string) => void;

  constructor(props: Props) {
    super(props);

    /* ---------------------------------------------------------------------- */
    /* temporary */
    /* ---------------------------------------------------------------------- */
    const currentTime = new Date().getTime();
    /* ---------------------------------------------------------------------- */
    /* temporary */
    /* ---------------------------------------------------------------------- */

    this.state = {
      // articles: [],
      /* -------------------------------------------------------------------- */
      /* temporary */
      /* -------------------------------------------------------------------- */
      articles: [
        {
          id: currentTime.toString(),
          time: currentTime,
          title: '(title)',
          desc: '(description)',
          blocks: [
            {
              id: currentTime.toString(),
              time: currentTime,
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
      this.setState((prevState) => {
        const currentTime = new Date().getTime();
        return {
          articles: prevState.articles.concat({
            id: currentTime.toString(),
            time: currentTime,
            title: '',
            desc: '',
            blocks: [
              {
                id: currentTime.toString(),
                time: currentTime,
                title: '',
                desc: '',
                body: '',
              },
            ],
          }),
        };
      });
    };

    this.removeArticle = (articleId) => {
      this.setState((prevState) => ({
        articles: prevState.articles.filter(
          (article) => article.id !== articleId,
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
