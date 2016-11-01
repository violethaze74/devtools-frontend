/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @unrestricted
 */
WebInspector.BreakpointsSidebarPaneBase = class extends WebInspector.VBox {
  constructor() {
    super();
    this.registerRequiredCSS('components/breakpointsList.css');

    this.listElement = createElement('ol');
    this.listElement.className = 'breakpoint-list';

    this.emptyElement = createElement('div');
    this.emptyElement.className = 'gray-info-message';
    this.emptyElement.textContent = WebInspector.UIString('No Breakpoints');

    this.element.appendChild(this.emptyElement);
  }

  /**
   * @param {!Element} element
   * @param {?Node=} beforeNode
   * @protected
   */
  addListElement(element, beforeNode) {
    if (beforeNode) {
      this.listElement.insertBefore(element, beforeNode);
    } else {
      if (!this.listElement.firstChild) {
        this.element.removeChild(this.emptyElement);
        this.element.appendChild(this.listElement);
      }
      this.listElement.appendChild(element);
    }
  }

  /**
   * @param {!Element} element
   * @protected
   */
  removeListElement(element) {
    this.listElement.removeChild(element);
    if (!this.listElement.firstChild) {
      this.element.removeChild(this.listElement);
      this.element.appendChild(this.emptyElement);
    }
  }

  /**
   * @protected
   */
  reset() {
    this.listElement.removeChildren();
    if (this.listElement.parentElement) {
      this.element.removeChild(this.listElement);
      this.element.appendChild(this.emptyElement);
    }
  }
};
