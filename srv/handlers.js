import cds from "@sap/cds";

export default cds.service.impl(function () {
  const { Books } = this.entities;

  this.before('CREATE', Books, req => {
    const now = new Date().toISOString();
    req.data.createdAt = now;
    req.data.updatedAt = now;
  });

  this.before('UPDATE', Books, req => {
    req.data.updatedAt = new Date().toISOString();
  });
});
