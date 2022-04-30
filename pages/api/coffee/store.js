// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function store(req, res) {
  res.status(200).json({ name: 'hello store' })
}

// it has higher priority than the catch-all route
// localhost:3000/api/coffee/store  has higher priority
// localhost:3000/api/coffee/anything-else