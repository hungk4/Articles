import { Query } from "mongoose";
import Article from "./models/article.model";

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false
      });
      
      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;
      
      const article = await Article.findOne({
        _id: id,
        deleted: false
      });
      return article;
    }
  },
  Mutation: {
    creataArticle: async (_, args) => {
      const { article } = args;

      const record = new Article(article);
      await record.save();

      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;

      await Article.updateOne({
        _id: id
      }, {
        deleted: true
      });

      return {
        code: 200,
        message: "Xoa thanh cong"
      };
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne({
        _id: id,
        deleted: false
      }, article);

      const newArticle = await Article.findOne({
        _id: id,
        deleted: false
      });
      return newArticle;
    }
  }
};