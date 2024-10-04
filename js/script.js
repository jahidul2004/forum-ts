const loadPost = async (category = "") => {
    let res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
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
            activity = "bg-red-500";
        }

        let postDiv = document.createElement("div");
        postDiv.innerHTML = `
            <div
                onclick="postRead('${postTitle}', ${viewCount}, '${postImage}', '${postCategory}', '${author}', '${description}')"
                class="cursor-pointer w-full bg-[#f0f2ff] border flex flex-col md:flex-row lg:flex-row gap-3 p-5 rounded-lg"
            >
                <div
                    class="w-[70px] h-[70px] rounded-lg relative"
                >
                    <img class="rounded-lg" src="${postImage}" alt="" />
                    <div
                        class="${activity} m-[2px] absolute right-0 top-0 w-[15px] h-[15px] rounded-full"
                    ></div>
                </div>
                <div class="w-full ml-80px">
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

const postRead = (title, view, profilePic, category, author, description) => {
    let container = document.getElementById("read-post-container");

    let item = document.createElement("div");
    item.innerHTML = `
        <div class="flex justify-between items-center p-5 gap-4 bg-white rounded-xl">
            <h1 class="font-bold">${title}</h1>
            <span class="font-semibold text-semiblack flex items-center"><i class="fa-regular fa-eye"></i> ${view}views</span>
        </div>
    `;
    container.appendChild(item);
    document.getElementById("read-count").innerText++;

    my_modal_1.showModal();

    let shodData = document.createElement("div");
    shodData.innerHTML = `
        <img
            class="w-[80px] h-[80px] rounded-full my-3 border-2 border-[#6066dd] m-auto"
            src="${profilePic}"
            alt=""
        />
        <div class="text-center">
            <p class="text-semiblack font-semibold">
                #${category} Author:${author}
            </p>
            <h1 class="text-xl font-bold mb-4">
                ${title}
            </h1>
            <p>
                ${description}
            </p>
        </div>
    `;
    document.getElementById("details-container").innerHTML = "";
    document.getElementById("details-container").appendChild(shodData);
};

document
    .getElementById("post-search-btn")
    .addEventListener("click", async function () {
        let searchText = document.getElementById("post-search").value;
        let res = await fetch(
            `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
        );
        let data = await res.json();

        let final = data.posts;
        if (final.length === 0) {
            alert("No post found");
        } else {
            document.getElementById("post-container").innerHTML = "";
            displayPost(final);
            console.log(final);
        }
        document.getElementById("post-search").value = "";
    });

const loadLatestPost = async () => {
    let res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    let data = await res.json();
    console.log(data);
    displayLatestPost(data);
};

loadLatestPost();

displayLatestPost = (posts) => {
    for (post of posts) {
        let coverImage = post.cover_image;
        let profileImage = post.profile_image;
        let title = post.title;
        let description = post.description;
        let author = post.author.name;

        let date = post.author.posted_date;
        if (typeof date !== "string") {
            date = "Not Published Yet";
        }

        let designation = post.author.designation;

        let container = document.getElementById("latest-post-container");

        let item = document.createElement("div");
        item.innerHTML = `
            
            <div class="border rounded-xl p-5">
                <div
                    class="mb-3 w-full rounded-xl h-[200px] bg-[#f3f3f3]"
                >
                    <img class="w-full rounded-xl h-full" src="${coverImage}" alt="" />
                </div>
                <div>
                    <p class="font-semibold text-semiblack">
                        <i class="fa-regular fa-calendar-plus"></i
                        ><span> ${date}</span>
                    </p>
                    <h1
                        class="text-lg md:text-xl lg:text-xl font-bold my-2"
                    >
                        ${title}
                    </h1>
                    <p class="text-semiblack font-semibold">
                        ${description}
                    </p>
                    <div class="flex my-2 gap-3 items-center">
                        <div
                            class="bg-[#f3f3f3] w-[50px] h-[50px] rounded-full"
                        >
                            <img class="w-full h-full rounded-full" src="${profileImage}" alt="" />
                        </div>
                        <div>
                            <h1 class="font-bold">
                                ${author}
                            </h1>
                            <p class="text-semiblack font-semibold">
                                ${designation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
                    
        `;
        container.appendChild(item);
    }
};
