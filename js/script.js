const letsFunc = async () => {
   
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json()
    const allPosts = data.posts

    const leftContainer = document.getElementById("left-side-container")
    leftContainer.textContent = ''

    allPosts.forEach((posts) => {
        const divContainer = document.createElement("div");
        divContainer.classList.add("flex", "mb-5", "gap-7", "bg-purple-50", "border", "border-purple-600", "p-5", "md:mb-12", "rounded-xl", "space-y-2")
        divContainer.innerHTML = `
                            <div class="indicator">
                            <span class="indicator-item badge ${posts.isActive ? 'bg-green-600' : 'bg-red-600'}"></span>
                          <div class="grid w-32 h-32 bg-base-300 place-items-center"> <img class="rounded-xl w-[100%]" src="${posts.image}" alt=""></div>
                          </div>

                        <div class="flex flex-col gap-5">
                            <div class="flex gap-10">
                                <p># ${posts.category}</p>
                                <p>Author : ${posts.author.name}</p>
                            </div>
                            <div class="flex flex-col space-y-6">
                                <h2 class="font-semibold text-xl">${posts?.title}</h2>
                                <p class=""> ${posts.description} </p>
                            </div>
                            <div class="border border-dashed border-gray-400 w-full"></div>

                            <div class="flex justify-between">

                                <div class="flex justify-around space-x-5">
                                    <div class="flex justify-center items-center gap-3">
                                        <img src="images/msg.png" alt="">
                                        <span>${posts.comment_count}</span>
                                    </div>

                                    <div class="flex justify-center items-center gap-3">
                                        <img src="images/view.png" alt="">
                                        <span>${posts.view_count}</span>
                                    </div>

                                    <div class="flex justify-center items-center gap-3">
                                        <img src="images/watch.png" alt="">
                                        <span>${posts.posted_time}</span>
                                    </div>
                                </div>
                                <button onclick="msgAsRead(${posts.id})"> <img src="images/mark-as.png" alt=""></button>
                            </div>

                        </div>
        `
        leftContainer.appendChild(divContainer)
    });
}

const msgAsRead = async (postId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json()
    const posts = data.posts
    const rightBoxContainer = document.getElementById("right-box-container");

    const post = posts.find(item => item.id == postId)
    
    console.log(post);

   
    const divBox = document.createElement("div");
    divBox.classList.add("flex", "justify-between", "bg-[#ffffffcc]", "rounded-xl", "p-4", "text-[#12132D]")
    divBox.innerHTML = `       
    <h2 class="text-xl font-semibold w-2/3">${post?.title}</h2>
                                <div class="flex justify-center items-center gap-3 text-xl">
                                <img class="w-7" src="images/view.png" alt="">
                                <span class="text-gray-500">${post.view_count}</span>
                                </div>
                                `;

    rightBoxContainer.appendChild(divBox);
    zeroCount()

}

const zeroCount = () => {
    const zeroId = document.getElementById("zero");
    let zero = parseInt(zeroId.innerText);
    zero += 1;
    zeroId.innerText = zero;
}

const latestFunc = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const data = await res.json()
    const latestPost = data;
    
    const allCardContainer = document.getElementById("allCard-container")
    // console.log(item)j
    latestPost.forEach(item => {
        const divCard = document.createElement("div");
        divCard.classList.add("card-container", "flex", "justify-center", "mb-6", "md:mb-0", "mt-8")
        divCard.innerHTML = ` 
        <div class="card w-96 bg-base-100 shadow-xl border">
        <figure class="px-10 pt-10">
        <img src="${item.cover_image}" alt="Shoes"
        class="rounded-xl" />
        </figure>
        <div class="card-body  flex items-start justify-start text-start">
                            <div class="flex gap-4 justify-start items-start">
                                <img src="images/tube.png" alt="">
                                <p>${item.author?.posted_date || "Not Publish Date"}</p>
                            </div>
                            <h2 class="card-title">${item.title}</h2>
                            <p>${item.description}</p>
                            <div class="card-actions gap-5">
                                <div>
                                    <img class="w-12 h-12 rounded-full" src="${item.profile_image}" alt="">
                                </div>
                                <div>
                                    <h2 class="font-semibold">${item.author?.name}</h2>
                                    <p>${item.author?.designation || "Unknown"}</p>
                                </div>
                            </div>
                        </div>
                    </div >
        `
        allCardContainer.appendChild(divCard)
    })
    
}

const searchHandler = async() => {
    const inputField = document.getElementById("input-field").value.toLowerCase();
    
    if (inputField.trim() === "" || typeof inputField !== "string" ) {
        return   alert("please provide a valid name")
       
    }

    document.getElementById("loading-spiner").classList.remove("hidden");
    document.getElementById("header-tag").classList.add("hidden");
    document.getElementById("main-tag").classList.add("hidden");
    document.getElementById("footer-tag").classList.add("hidden");

    



catName(inputField)

const leftContainer = document.getElementById("left-side-container")
leftContainer.classList.add("hidden")

const catContainer = document.getElementById("left-container");
catContainer.classList.remove("hidden")


const rightBoxContainer = document.getElementById("right-box-container");
rightBoxContainer.textContent = "";

}

const catName = async (inputField) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputField}`);
    const data = await res.json();
    const catPosts = data.posts;
    console.log(catPosts)

    const catContainer = document.getElementById("left-container");
    catContainer.textContent = "";

    catPosts.forEach(posts => {

        console.log(posts);
        const postElement = document.createElement("div");
        postElement.classList.add("flex", "mb-5", "gap-7", "bg-purple-50", "border", "border-purple-600", "p-5", "md:mb-12", "rounded-xl", "space-y-2");
        postElement.innerHTML = `
        <div class="indicator">
        <span class="indicator-item badge ${posts.isActive ? 'bg-green-600' : 'bg-red-600'}"></span>
      <div class="grid w-32 h-32 bg-base-300 place-items-center"> <img class="rounded-xl w-[100%]" src="${posts.image}" alt=""></div>
      </div>

    <div class="flex flex-col gap-5">
        <div class="flex gap-10">
            <p>${posts.category}</p>
            <p>Author : ${posts.author.name}</p>
        </div>
        <div class="flex flex-col space-y-6">
            <h2 class="font-semibold text-xl">${posts?.title}</h2>
            <p class=""> ${posts.description} </p>
        </div>
        <div class="border border-dashed border-gray-400 w-full"></div>

        <div class="flex justify-between">

            <div class="flex justify-around space-x-5">
                <div class="flex justify-center items-center gap-3">
                    <img src="images/msg.png" alt="">
                    <span>${posts.comment_count}</span>
                </div>

                <div class="flex justify-center items-center gap-3">
                    <img src="images/view.png" alt="">
                    <span>${posts.view_count}</span>
                </div>

                <div class="flex justify-center items-center gap-3">
                    <img src="images/watch.png" alt="">
                    <span>${posts.posted_time}</span>
                </div>
            </div>
            <button onclick="msgAsRead(${posts.id})"> <img src="images/mark-as.png" alt=""></button>
        </div>

    </div>
`
        catContainer.appendChild(postElement);
    });
    
     setTimeout(() => {
        document.getElementById("loading-spiner").classList.add("hidden");
        document.getElementById("header-tag").classList.remove("hidden");
        document.getElementById("main-tag").classList.remove("hidden");
        document.getElementById("footer-tag").classList.remove("hidden");
        
        
    }, 2000);
}



letsFunc()
latestFunc()


