namespace app;

entity Books {
  key ID    : Integer;
  title     : String(111);
  author    : String(111);
  stock     : Integer default 0;
  createdAt : Timestamp;
  updatedAt : Timestamp;
}
