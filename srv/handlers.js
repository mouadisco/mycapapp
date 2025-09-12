import cds from "@sap/cds";

export default cds.service.impl(function () {
  const { Books, Users } = this.entities;

  // Books handlers
  this.before('CREATE', Books, req => {
    console.log('CREATE Books - Received data:', req.data);
    const now = new Date().toISOString();
    req.data.createdAt = now;
    req.data.updatedAt = now;
    console.log('CREATE Books - Final data:', req.data);
  });

  this.before('UPDATE', Books, req => {
    req.data.updatedAt = new Date().toISOString();
  });

  // Users handlers
  this.before('CREATE', Users, req => {
    console.log('CREATE Users - Received data:', req.data);
    const now = new Date().toISOString();
    req.data.createdAt = now;
    req.data.updatedAt = now;
    console.log('CREATE Users - Final data:', req.data);
  });

  this.before('UPDATE', Users, req => {
    console.log('UPDATE Users - Received data:', req.data);
    req.data.updatedAt = new Date().toISOString();
    console.log('UPDATE Users - Final data:', req.data);
  });
});
