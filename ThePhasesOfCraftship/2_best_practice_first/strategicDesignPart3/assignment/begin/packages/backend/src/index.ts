import server from './bootstrap';

const port = Number(process.env.PORT || 3000);

server.start(port);
/*

// Get posts
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;
    
    if (sort !== 'recent') {
      return res.status(400).json({ error: Errors.ClientError, data: undefined, success: false })
    } 

    let postsWithVotes = await prisma.post.findMany({
      include: {
        votes: true, // Include associated votes for each post
        memberPostedBy: {
          include: {
            user: true
          }
        },
        comments: true
      },
      orderBy: {
        dateCreated: 'desc', // Sorts by dateCreated in descending order
      },
    });
    return res.json({ error: undefined, data: { posts: postsWithVotes }, success: true });
  } catch (error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// add user to marketing
app.post('/marketing/new', async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
     // Do the actual work
     console.log(
      `MailchimpContactList: Adding ${email} list... for production usage.`,
    );
    const result = true;
    const response = {
        success: true,
        data: result as any,
        error: {}
    };

    return res.status(201).json(response);
  } catch(error) {
    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false })
  }
});*/