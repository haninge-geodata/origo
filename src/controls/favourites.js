import { Component, Button, Element as El, dom } from '../ui';
import utils from '../utils';
import permalinkStore from '../permalink/permalinkstore';
import permalink from '../permalink/permalink';
import generateUUID from '../utils/generateuuid';

const Favourites = function Favourites(options = {}) {
  const {
    closeIcon = '#ic_close_24px',
    favouritesIcon = '#ic_heart_24px',
    title = 'Favoriter',
    autoClose = true,
    serviceEndpoint
  } = options;
  let {
    isActive = false
  } = options;
  let headerComponent;
  let titleComponent;
  let listComponent;
  let contentComponent;
  let formComponent;
  let liComponent;
  let favouritesButton;
  let favouritesButtonEl;
  let favourites;
  let favouritesEl;
  let closeButton;
  let createFavouriteButton;
  let viewer;
  let target;
  let submit;
  let form;
  let userId;

  const favouritesFromServerArr = [];

  // TA BORT INFÖR PROD!
  const setGetUserIdForTest = () => {
    if (!localStorage.getItem('userIdForOrigoTest')) {
      localStorage.setItem('userIdForOrigoTest', generateUUID());
    }
    userId = localStorage.getItem('userIdForOrigoTest');
  };

  const toggle = function toggle() {
    favouritesEl.classList.toggle('faded');
    favouritesButtonEl.classList.toggle('active');
    isActive = !isActive;
    favouritesEl.style.cssText = 'top: 3.5rem; left: 4rem;';
  };

  const close = function close() {
    if (isActive) {
      toggle();
    }
  };

  const getPageId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageId = searchParams.get('id');
    if (searchParams.has('id')) {
      return pageId;
    }
    return undefined;
  };

  const openFavourite = function openFavourite(id, pageTitle) {
    const openFav = window.open(`/origo-test/?id=${id}${window.location.hash}`, '_blank');
    setTimeout(() => {
      openFav.document.title = pageTitle;
    }, 0);
  };

  const setPageTitle = async () => {
    if (getPageId() !== undefined) {
      await fetch(`${serviceEndpoint}/${getPageId()}`)
        .then(response => response.json())
        .then(data => {
          document.title = `Webb-GIS - ${data.name}`;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const favourite = function favourite({
    id,
    favouriteTitle = '',
    openFavouriteButtonClick,
    updateButtonClick,
    deleteButtonClick
  } = {}) {
    const iconSelector = () => {
      if (getPageId() === id) {
        return '#ic_heart_24px';
      }
      return '#ic_heart_outline_24px';
    };
    const titleCmp = El({ cls: 'padding-left padding-right', style: 'align-self: center', innerHTML: favouriteTitle });
    const favouriteButton = Button({
      cls: 'favourites-hover icon-small compact',
      click: openFavouriteButtonClick,
      icon: iconSelector()
    });
    const updateButton = Button({
      cls: 'favourites-hover icon-small compact',
      click: updateButtonClick,
      icon: '#ic_content-save-outline_24px'
    });
    const deleteButton = Button({
      cls: 'favourites-hover icon-small compact',
      click: deleteButtonClick,
      icon: '#ic_trash_can_outline_24px'
    });

    return Component({
      close,
      onInit() {
        this.addComponents([favouriteButton, updateButton, deleteButton]);
      },
      onRender() {
        this.dispatch('render');
        document.getElementById(titleCmp.getId()).addEventListener('click', () => {
          favouriteButton.dispatch('click');
        });
      },
      render() {
        return `<li id="${id}" class="flex row text-small padding-x padding-y-smaller">
                  <span class="flex row pointer">
                    ${favouriteButton.render()}
                    ${titleCmp.render()}
                  </span>
                  <span class="flex row margin-left-auto pointer">
                    ${updateButton.render()}
                  </span>
                  <span class="flex row margin-left pointer">
                    ${deleteButton.render()}
                  </span>
                </li>`;
      }
    });
  };

  const requestsHandler = {};

  requestsHandler.getFavourite = async (id) => {
    fetch(`${serviceEndpoint}/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  requestsHandler.getFavourites = async (user) => {
    fetch(`${serviceEndpoint}/list/${user}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  requestsHandler.post = (body) => {
    fetch(`${serviceEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  requestsHandler.put = (id, body) => {
    fetch(`${serviceEndpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  requestsHandler.delete = (id) => {
    fetch(`${serviceEndpoint}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return Component({
    name: 'favourites',
    close,
    favourite,
    onAdd(evt) {
      viewer = evt.target;
      target = document.getElementById(viewer.getMain().getMapTools().getId());
    },
    async onInit() {
      setGetUserIdForTest();
      const favouritesButtonCls = isActive ? ' active' : '';
      const favouritesElCls = isActive ? '' : ' faded';

      if (serviceEndpoint) {
        permalink.setSaveOnServerServiceEndpoint(serviceEndpoint);
      }

      favouritesButton = Button({
        icon: favouritesIcon,
        cls: `o-favourites control icon-smaller medium round light${favouritesButtonCls}`,
        tooltipText: title,
        tooltipPlacement: 'east',
        click() {
          toggle();
        }
      });

      closeButton = Button({
        cls: 'small round margin-top-smaller margin-bottom-auto margin-right-small icon-smallest grey-lightest',
        ariaLabel: 'Stäng',
        icon: closeIcon,
        click() {
          toggle();
        }
      });

      titleComponent = El({
        cls: 'justify-start margin-y-smaller margin-left text-weight-bold',
        style: { width: '100%' },
        innerHTML: title
      });

      headerComponent = El({
        cls: 'flex row justify-end',
        style: { width: '100%' },
        components: [titleComponent, closeButton]
      });

      await fetch(`${serviceEndpoint}/list/${userId}`)
        .then(response => response.json())
        .then(data => {
          const favouritesFromServer = data;
          favouritesFromServer.forEach((item) => {
            const id = item.id;
            const fav = favourite({
              openFavouriteButtonClick() {
                openFavourite(id, item.name);
                if (autoClose) {
                  const size = viewer.getSize();
                  if (size === 'm' || size === 's' || size === 'xs') {
                    toggle();
                  }
                }
              },
              updateButtonClick() {
                if (getPageId() === item.id) {
                  if (window.confirm('Vill du uppdatera den här favoriten med hur kartan ser ut nu?')) {
                    requestsHandler.put(id, {
                      id,
                      data: permalinkStore.getState(viewer, true)
                    });
                  }
                } else {
                  alert(`Öppna favoriten "${item.name}" för att uppdatera den`);
                }
              },
              deleteButtonClick() {
                if (window.confirm('Vill du radera den här favoriten?')) {
                  requestsHandler.delete(id);
                  document.getElementById(id).remove();
                  if (id === getPageId()) {
                    window.open(`/origo-test/${window.location.hash}`, '_self');
                  }
                }
              },
              id,
              favouriteTitle: item.name
            });
            favouritesFromServerArr.push(fav);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });

      listComponent = El({
        tagName: 'ul',
        cls: 'padding-y-small',
        components: favouritesFromServerArr
      });

      contentComponent = El({
        cls: 'relative',
        components: [listComponent]
      });

      createFavouriteButton = Button({
        cls: 'favourites-hover icon-small compact no-grow',
        click: submit,
        icon: '#ic_heart-plus-outline_24px',
        style: 'vertical-align: middle; margin-left: 10px;'
      });

      formComponent = El({
        cls: 'text-small padding-x padding-y-smaller',
        innerHTML: '<form><hr class="border">'
          + '<label for="name" class="flex wrap column text-small padding-top padding-bottom">Skapa ny favorit</label>'
          + '<input type="text" name="name" id="name" class="text-small padding-right rounded-larger" placeholder="Namnge favorit"/>'
          + `${createFavouriteButton.render()}`
          + '</form>'
      });

      favourites = El({
        cls: `absolute flex column control bg-white text-small overflow-hidden z-index-top no-select grab${favouritesElCls}`,
        style: 'top: 4rem; left: 4rem;',
        collapseX: true,
        components: [headerComponent, contentComponent, formComponent]
      });

      this.on('render', this.onRender);
      this.addComponents([favourites, favouritesButton]);
      this.render();
    },
    hide() {
      document.getElementById(favouritesButton.getId()).classList.add('hidden');
      document.getElementById(favourites.getId()).classList.add('hidden');
    },
    unhide() {
      document.getElementById(favouritesButton.getId()).classList.remove('hidden');
      document.getElementById(favourites.getId()).classList.remove('hidden');
    },
    onSubmit(e) {
      const newFavourites = [];
      const formData = new FormData(e.target);
      const value = Object.fromEntries(formData.entries());
      const favObj = {
        name: value.name,
        user: localStorage.getItem('userIdForOrigoTest'),
        data: permalinkStore.getState(viewer, true)
      };
      favObj.data.map = viewer.getMapName().replace('.json', '');
      const reqBody = JSON.stringify(favObj);
      e.preventDefault();
      fetch(`${serviceEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: reqBody
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const id = data.id;
          const newFavourite = favourite({
            openFavouriteButtonClick() {
              openFavourite(id, data.name);
              if (autoClose) {
                const size = viewer.getSize();
                if (size === 'm' || size === 's' || size === 'xs') {
                  toggle();
                }
              }
            },
            updateButtonClick() {
              if (getPageId() === data.id) {
                if (window.confirm('Vill du uppdatera den här favoriten med hur kartan ser ut nu?')) {
                  requestsHandler.put(id, {
                    id,
                    data: permalinkStore.getState(viewer, true)
                  });
                }
              } else {
                alert(`Öppna favoriten "${data.name}" för att uppdatera den`);
              }
            },
            deleteButtonClick() {
              if (window.confirm('Vill du radera den här favoriten?')) {
                requestsHandler.delete(id);
                document.getElementById(id).remove();
                if (id === getPageId()) {
                  window.open(`/origo-test/${window.location.hash}`, '_self');
                }
              }
            },
            id,
            favouriteTitle: data.name
          });
          newFavourites.push(newFavourite);

          liComponent = El({
            target: document.getElementById(listComponent.getId()),
            tagName: 'li',
            components: newFavourites
          });
          liComponent.render();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      form.reset();
    },
    render() {
      const favEl = dom.html(favourites.render());
      document.getElementById(viewer.getMain().getId()).appendChild(favEl);
      favouritesEl = document.getElementById(favourites.getId());
      const el = dom.html(favouritesButton.render());
      target.appendChild(el);
      favouritesButtonEl = document.getElementById(favouritesButton.getId());
      this.dispatch('render');
      form = document.querySelector('form');
      submit = form.addEventListener('submit', this.onSubmit);
      utils.makeElementDraggable(favouritesEl);
      setPageTitle();
    }
  });
};

export default Favourites;
