import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
import blogs from './_blogs';

//when we export this api will work in browser, so process will be undefined
// TODO: production is 0, development is 1
var process = {
    env: { DEV: "0" },
    version: []
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.post["Content-Type"] = "application/json";
const BLOG_API = "/api/blog";


async function callActorWithArgs(actorCmd, actorArgs) {

    let p = () => axios.post(`${BLOG_API}/${actorCmd}`, actorArgs)

    let resp = await p()
    return new Promise((resolve, reject) => resolve(resp.data))

}

export function getMetadata(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== "undefined") {
            return callActorWithArgs("metadata", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(metadata)
        });
    }
}

// TODO::
// getPageBySlug(blogName, page_slug)..

// getPostsBySlug()...


export function getBlogs() {

    if (process.env.DEV !== "1") {
        return callActorWithArgs("", {})
    } else {
        return new Promise(function (resolve, reject) {
            resolve(blogs)
        });
    }
}

export function getPosts(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== "undefined") {
            return callActorWithArgs("posts", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(posts)
        });
    }
}

export function getTags(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== "undefined") {
            return callActorWithArgs("tags", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(tags)
        });
    }
}

export function getPages(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== "undefined") {
            return callActorWithArgs("pages", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(pages)
        });
    }
}

export function search(blogName, query) {

    if (!blogName) {
        blogName = ""
    }
    console.log(`search ${blogName} ${query}`)
    if (process.env.DEV !== "1") {
        return callActorWithArgs("search", {
            blog_name: blogName,
            query: query
        })
    } else {
        return searchLocal(blogName, query)
    }
}


async function searchLocal(blogName, query) {
    console.log(pages.length)
    console.log(posts.length)

    let theposts = []
    let thepages = []
    let blogs = [];
    if (!blogName) {
        blogs = await getBlogs();
    } else {
        blogs.push(blogName)
    }
    for (let blog of blogs) {
        // console.log(`posts of ${blog}`, await getPosts(blog))
        theposts = [...theposts, ...(await getPosts(blog))];
        thepages = [...thepages, ...(await getPages(blog))];
    }

    console.log(theposts.length)
    console.log(thepages.length)

    let results = []
    for (let blog of blogs) {

        for (let post of theposts) {
            if (post.content_with_meta.includes(query)) {
                let temp = { "type": "posts", "slug": post.slug, "blog_name": blog }
                if (!results.includes(temp)) {
                    results.push(temp)
                }
            }
        }


        for (let page of thepages) {
            if (page.content_with_meta.includes(query)) {
                let temp = { "type": "pages", "slug": page.slug, "blog_name": blog }

                if (!results.includes(temp)) {
                    results.push(temp)
                }
            }
        }
    }



    console.log("results: ", results)
    return new Promise((resolve, reject) => resolve(results));

}