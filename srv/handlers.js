import cds from "@sap/cds";

export default cds.service.impl(function () {
  const { Books } = this.entities;

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
});
