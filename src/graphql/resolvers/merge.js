const transformAssay = assay => {
  return {
    ...assay._doc
  };
};

exports.transformAssay = transformAssay;
