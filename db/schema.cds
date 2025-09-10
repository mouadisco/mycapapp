namespace app;

entity Books {
  key ID    : Integer;
  title     : String(111);
  author    : String(111);
  stock     : Integer default 0;
  createdAt : Timestamp;
  updatedAt : Timestamp;
}

entity Users {
  key ID        : Integer;
  username    : String(50);
  email       : String(100);
  password    : String(255);
  firstName   : String(50);
  lastName    : String(50);
  role        : String(20) default 'user';
  isActive    : Boolean default true;
  createdAt   : Timestamp;
  updatedAt   : Timestamp;
}
