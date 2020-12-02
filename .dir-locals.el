
;;; Directory Local Variables
;;; For more information see (info "(emacs) Directory Variables")

(
 (nil .
      (
       (eval add-hook 'after-save-hook '(lambda () (org-publish-project "org"))  nil t)))
 )
