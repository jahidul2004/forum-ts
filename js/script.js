const loadPost = async () => {
    let res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    let data = await res.json();
    let posts = data.posts;

    displayPost(posts);
};

const displayPost = (posts) => {
    for (post of posts) {
        let container = document.getElementById("post-container");

        let postImage = post.image;
        let postTitle = post.title;
        let postCategory = post.category;
        let description = post.description;
        let commentCount = post.comment_count;
        let viewCount = post.view_count;
        let postDate = post.posted_time;
        let author = post.author.name;
        //Activity status
        let activity = "";
        let isActive = post.isActive;

        if (isActive === true) {
            activity = "bg-green-400";
        } else {
            activity = "bg-red-400";
        }

        let postDiv = document.createElement("div");
        postDiv.innerHTML = `
            <div
                class="w-full bg-[#f0f2ff] border flex flex-col md:flex-row lg:flex-row gap-3 p-5 rounded-lg"
            >
                <div
                    class="bg-white w-[70px] h-[70px] rounded-lg relative"
                >
                    <img class="rounded-lg" src="${postImage}" alt="" />
                    <div
                        class="${activity} m-[2px] absolute right-0 top-0 w-[15px] h-[15px] rounded-full"
                    ></div>
                </div>
                <div>
                    <div
                        class="flex gap-3 text-semiblack font-semibold"
                    >
                        <p>#<span>${postCategory}</span></p>
                        <p>Author:<span>${author}</span></p>
                    </div>
                    <h1 class="text-2xl font-bold my-2">
                        ${postTitle}
                    </h1>
                    <p class="text-semiblack font-semibold mb-2">
                        ${description}
                    </p>
                    <div class="flex w-full justify-between">
                        <div
                            class="flex gap-3 font-semibold text-semiblack"
                        >
                            <span
                                ><i
                                    class="fa-regular fa-message"
                                ></i
                                ><span> ${commentCount}</span></span
                            >
                            <span
                                ><i class="fa-regular fa-eye"></i
                                ><span> ${viewCount}</span></span
                            >
                            <span
                                ><i class="fa-regular fa-clock"></i
                                ><span> ${postDate} Min</span></span
                            >
                        </div>
                        <div>
                            <span
                                ><i
                                    class="p-2 text-white bg-green-700 rounded-full fa-regular fa-envelope"
                                ></i
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(postDiv);
    }
};

loadPost();
