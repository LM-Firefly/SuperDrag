chrome.storage.sync.get({superDrag: _getDefault()}, function (superDrag) {
    if (superDrag.superDrag.effect_link === 1 && superDrag.superDrag.linkTextSelect) {
        // The original code is copyrighted by Griever and licensed under the MIT license.
        class LinkDragSelection {
            constructor() {
                this.init(...arguments);
            }

            init(event) {
                this.moved_flag = false;
                this.range = document.caretRangeFromPoint(event.clientX, event.clientY);
                const sel = getSelection();
                if (!sel.isCollapsed &&
                    sel.getRangeAt(0).isPointInRange(this.range.startContainer, this.range.startOffset)) {
                    return;
                }
                this.screenX = event.screenX;
                this.screenY = event.screenY;
                document.addEventListener('mousemove', this, false);
                document.addEventListener('mouseup', this, false);
            }

            uninit() {
                this.moved_flag = false;
                document.removeEventListener('mousemove', this, false);
                document.removeEventListener('mouseup', this, false);
                document.removeEventListener('dragstart', this, false);
                setTimeout(() => {
                    document.removeEventListener('click', this, false);
                }, 10);
            }

            handleEvent(event) {
                switch (event.type) {
                    case 'mousemove':
                        if (this.moved_flag) {
                            const range = document.caretRangeFromPoint(event.clientX, event.clientY);
                            if (range) {
                                getSelection().extend(range.startContainer, range.startOffset);
                            }
                        } else {
                            this.moveX = event.screenX;
                            this.moveY = event.screenY;
                            this.checkXY();
                        }
                        break;
                    case 'mouseup':
                        this.uninit();
                        break;
                    case 'dragstart':
                        event.currentTarget.removeEventListener(event.type, this, false);
                        if (this.moved_flag) {
                            event.preventDefault();
                            // event.stopPropagation();
                        } else {
                            this.checkXY();
                        }
                        break;
                    case 'click':
                        event.currentTarget.removeEventListener(event.type, this, false);
                        if (!getSelection().isCollapsed) {
                            event.preventDefault();
                            // event.stopPropagation();
                        }
                        break;
                }
            }

            selectionStart() {
                this.moved_flag = true;
                getSelection().collapse(this.range.startContainer, this.range.startOffset);
                document.addEventListener('dragstart', this, false);
                document.addEventListener('click', this, false);
            }

            checkXY() {
                const x = Math.abs(this.screenX - this.moveX);
                const y = Math.abs(this.screenY - this.moveY);
                if (x > y) {
                    this.selectionStart();
                }
                if (x >= 4 || y >= 4) {
                    this.uninit();
                }
            }
        }

        document.addEventListener('mousedown', event => {
            if (event.button === 0 && !event.altKey && event.target.matches('a[href], a[href] *')) {
                new LinkDragSelection(event);
            }
        }, false);
    }

    function copyAny(word) {
        navigator.clipboard.writeText(word)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                // This can happen if the user denies clipboard permissions:
                console.error('Could not copy text: ', err);
            });
    }

    const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    const _dic = {};
    const isTextArea = element => element.matches(
        'input[type="email"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="url"], textarea'
    ) && !element.disabled;
    document.addEventListener('dragstart', event => {
        _dic.start_time = new Date().getTime();
        _dic.startX = event.x;
        _dic.startY = event.y;
    }, false);
    document.addEventListener('dragover', event => {
        if (event.dataTransfer.types.includes('text/uri-list')) {
            event.dataTransfer.dropEffect = 'link';
            event.preventDefault();
        } else if (event.dataTransfer.types.includes('text/plain')) {
            if (!isTextArea(event.target)) {
                event.dataTransfer.dropEffect = 'link';
                event.preventDefault();
            }
        }
    }, false);
    document.addEventListener('drop', event => {
        _dic.stop_time = new Date().getTime();
        time_collect = parseInt(_dic.stop_time - _dic.start_time);
        if ((superDrag.superDrag.timeout === 0 || superDrag.superDrag.timeout > time_collect)
            && (!superDrag.superDrag.enableAlt || (superDrag.superDrag.enableAlt && (!event.altKey || (isMac && !event.metaKey))))){
            let items;
            let position_text;
            let position_link;
            _dic.endX = event.x;
            _dic.endY = event.y;
            let moveX = _dic.endX - _dic.startX;
            let moveY = _dic.endY - _dic.startY;
            if (superDrag.superDrag.effect_text === 0) {
                if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                    position_text = 0;
                } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                    position_text = 1;
                } else if (Math.abs(moveY) < Math.abs(moveX) && moveX < 0) {
                    position_text = 2;
                } else {
                    position_text = 3;
                }
            } else if (superDrag.superDrag.effect_text === 1) {
                if (moveY < 0) {
                    position_text = 0;
                } else {
                    position_text = 1;
                }
            } else if (superDrag.superDrag.effect_text === 2) {
                if (moveX < 0) {
                    position_text = 2;
                } else {
                    position_text = 3;
                }
            }
            if (superDrag.superDrag.effect_link === 0) {
                if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                    position_link = 0;
                } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                    position_link = 1;
                } else if (Math.abs(moveY) < Math.abs(moveX) && moveX < 0) {
                    position_link = 2;
                } else {
                    position_link = 3;
                }
            } else if (superDrag.superDrag.effect_link === 1) {
                if (moveY < 0) {
                    position_link = 0;
                } else {
                    position_link = 1;
                }
            } else if (superDrag.superDrag.effect_link === 2) {
                if (moveX < 0) {
                    position_link = 2;
                } else {
                    position_link = 3;
                }
            }
            let keyword = event.dataTransfer.getData('text/plain');
            let urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
            if (event.dataTransfer.types.includes('text/uri-list')) {
                if (superDrag.superDrag.link_type[position_link] === 0) {
                    _dic['url'] = keyword
                    _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    chrome.runtime.sendMessage(_dic);
                    event.preventDefault();
                } else if (superDrag.superDrag.link_type[position_link] === 1) {
                    copyAny(keyword);
                    event.preventDefault();
                } else if (superDrag.superDrag.link_type[position_link] === 2) {
                    items = event.dataTransfer.getData('text/html');
                    let domparser = new DOMParser();
                    let doc = domparser.parseFromString(items, 'text/html');
                    if (doc.links.length) {
                        copyAny(doc.links[0].text);
                    } else if (doc.images.length) {
                        copyAny(doc.images[0].src);
                    } else {
                        copyAny(keyword);
                    }
                    event.preventDefault();
                }
            } else if (urlPattern.test(keyword)) {
                if (superDrag.superDrag.link_type[position_link] === 0 && !isTextArea(event.target)) {
                    keyword = "https://" + keyword;
                    _dic['url'] = keyword;
                    _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    chrome.runtime.sendMessage(_dic);
                    event.preventDefault();
                } else if ((superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) && !isTextArea(event.target)) {
                    copyAny(keyword);
                    event.preventDefault();
                }
            } else if (event.dataTransfer.types.includes('text/plain')) {
                if (superDrag.superDrag.text_type[position_text] === 0 && !isTextArea(event.target)) {
                    if (superDrag.superDrag.searchEngines[position_text].url) {
                        _dic['url'] = superDrag.superDrag.searchEngines[position_text].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        _dic['url'] = _build_in_seach_engines[superDrag.superDrag.searchEngines[position_text]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    _dic['active'] = superDrag.superDrag.open_type[position_text] === 0;
                    chrome.runtime.sendMessage(_dic);
                    event.preventDefault();
                } else if (superDrag.superDrag.text_type[position_text] === 1 && !isTextArea(event.target)) {
                    copyAny(keyword)
                    event.preventDefault();
                }
            }
        }
    }, false);
})
