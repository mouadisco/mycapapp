using app from '../db/schema';

service CatalogService {
  entity Books as projection on app.Books;
}
