const notFound = (req, res) => res.status(404).send('ROUTE does not exist');

export default notFound;