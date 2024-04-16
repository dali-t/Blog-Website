"use strict";

const MAX_LENGTH = 200;
const blogs = [
  {
    title: 'HTML Semantic Tags',
    date: new Date(2022, 7, 31),
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate sint ullam fugiat fugit magni, aliquam quae voluptate, quo eos minima numquam repellendus rerum ipsa ea est. Maxime, dicta delectus eum a minus iure optio eveniet culpa, ipsum iste repellendus laudantium eos deserunt commodi animi distinctio ex hic? At amet dolore nemo accusamus nisi quae, ratione nam. Totam harum expedita temporibus dolore unde sed id debitis suscipit odio voluptates doloremque rem nobis aperiam quasi assumenda doloribus ad vero repellat, alias adipisci tenetur aspernatur vel. Culpa inventore architecto aspernatur dolor natus labore.'
  },
  {
    title: 'CSS Selectors',
    date: new Date(2022, 8, 9),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },
  {
    title: 'Cascading',
    date: new Date(2022, 8, 12),
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum architecto provident exercitationem modi inventore obcaecati, fuga, fugiat vero quo iusto vitae minima perspiciatis dolorum incidunt ea dolorem laboriosam illo. Cupiditate est enim aut magni, doloribus animi, fuga inventore eveniet quaerat similique voluptate debitis ad possimus totam repellendus harum voluptatem sit adipisci velit quisquam praesentium sed corporis temporibus facere! Labore architecto deleniti deserunt voluptates velit, maxime ea nisi placeat, eius in reiciendis, saepe alias quidem dignissimos debitis quos tenetur natus.'
  }
];

blogs.forEach(blog => {
  addEntry(blog);
});

function addEntry(blog) {
  const blogContainer = document.createElement('article');
  blogContainer.classList.add('post');

  const blogHeader = document.createElement('h3');
  blogHeader.classList.add('blog-header');
  blogHeader.textContent = blog.title;
  blogContainer.appendChild(blogHeader);

  const blogDate = document.createElement('p');
  blogDate.textContent = blog.date.toLocaleDateString();
  blogContainer.appendChild(blogDate);

  const blogContent = document.createElement('p');
  blogContainer.appendChild(blogContent);

  if (blog.content.length > MAX_LENGTH) {
    blogContent.textContent = blog.content.substring(0, MAX_LENGTH);
    let ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    blogContent.appendChild(ellipsis);

    let hiddenContentSpan = document.createElement('span');
    hiddenContentSpan.textContent = blog.content.substring(MAX_LENGTH);
    hiddenContentSpan.classList.add('hide');
    blogContent.appendChild(hiddenContentSpan);

    let readMoreBtn = document.createElement('button');
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.classList.add('more-less-btn');
    blogContainer.appendChild(readMoreBtn);
  } else {
    blogContent.textContent = blog.content;
  }

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '[x]';
  removeBtn.classList.add('delete-btn');
  blogHeader.appendChild(removeBtn);

  document.querySelector('.posts').appendChild(blogContainer);
}

const newBtn = document.querySelector('.new-btn');
newBtn.addEventListener('click', () => {
  const newSection = document.querySelector('.new-section');
  newSection.classList.toggle('hide');
});

const postsElement = document.querySelector('.posts');
postsElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const postElement = event.target.closest('.post');
    const blogTitle = postElement.querySelector('h3').textContent;
    const blogIndex = blogs.findIndex((blog) => blog.title === blogTitle);
    blogs.splice(blogIndex, 1);
    postElement.remove();
  }
});

const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', () => {
  const form = document.querySelector('form');
  if (form.reportValidity()) {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';
    const date = new Date();
    const blog = { title, content, date };
    blogs.push(blog);
    addEntry(blog);
  }
});

postsElement.addEventListener('click', function (event) {
  if (event.target.classList.contains('more-less-btn')) {
    let spans = event.target.previousSibling.querySelectorAll('span');
    spans.forEach((span) => span.classList.toggle('hide'));
    if (event.target.textContent === 'Read More') {
      event.target.textContent = 'Read Less';
    } else {
      event.target.textContent = 'Read More';
    }
  }
});
