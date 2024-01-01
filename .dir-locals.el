;;; Directory Local Variables            -*- no-byte-compile: t -*-
;;; For more information see (info "(emacs) Directory Variables")

((org-mode . ((eval . (setq org-publish-project-alist
                            '(("org-static" :base-directory "./static/" :base-extension any :publishing-directory "./public_html/" :recursive t :publishing-function org-publish-attachment)
                              ("org-pdfs" :base-directory "./pdfs/" :base-extension "org" :publishing-directory "./public_html/" :recursive t :publishing-function org-latex-publish-to-pdf)
                              ("org-pages" :base-directory "./" :base-extension "org" :publishing-directory "./public_html/" :recursive t :publishing-function org-html-publish-to-html :headline-levels 4 :auto-preamble t)
                              ("org-media" :base-directory "./media/" :base-extension any :publishing-directory "./public_html/media/" :recursive t :publishing-function org-publish-attachment)
                              ("org-app" :base-directory "./js/" :base-extension any :publishing-directory "./public_html/js/" :recursive t :publishing-function org-publish-attachment)
                              ("Regenerate website-name.com!" :components
                               ("org-media" "org-pages" "org-static" "org-pdfs" "org-app"))))))))
