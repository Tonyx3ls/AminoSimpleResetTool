const communityList = {
    coms: [],
    status: 'not ok',
    error: 'there has been nothing done with the Object.'
};

const communityBlogFeed = {
    blogs: [],
    status: 'not ok',
    error: 'nothing happened...'
};

const threadList = {
    threads: [],
    status: 'not ok',
    error: 'not everything defined'
};

const recivedMessages = {
    messages: [],
    status: 'not ok',
    error: 'nothing happend'
};

const profile = {
    account: {
        uid: 'def. with. func.',
        username: 'defaulting with function',
        mediaList: ['with Arrays. lol.'],
        icon: 'def. with func. blame rob'
    },
    status: 'not okay',
    error: 'nothing happend!'
};
const comments = {
    comments: [],
    status: 'not okay',
    error: 'nothing happend!'
};
const blog = {
    blog: {},
    status: 'not okay',
    error: 'nothing happend!'
};
const profileBlogs = {
    blogs: [],
    status: 'not ok',
    error: 'not everything defined'
};

const wiki = {
    item: {
        itemid: 'id',
        createdTime: 'time',
        title: 'title',
        content: 'content',
        author: {
            uid: 'id',
            username: 'nickname',
            icon: 'icon',
            role: 'role',
            level: 'level'
        },
        mediaList: 'mediaList',
        likeCount: 'likeCount',
        commentCount: 'commentCount'
    },
    status: 'not ok',
    error: 'nothing happend.'
};

module.exports = {
    blog,
    communityList,
    threadList,
    recivedMessages,
    profile,
    comments,
    profileBlogs,
    wiki,
    sendingMessage: {
        message: {
            sent: false,
            message: 'defaults with begining of method. if not. may god help you.',
            threadId: 'defaults with begining of method. if not. may god help you.'
        },
        status: 'not ok',
        error: 'Nothing has been done.'
    },
    communityBlogFeed
};