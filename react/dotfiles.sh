# create bare repo in ~/.cfg
git clone --bare git@github.com:scottstav/dotfiles.git $HOME/.cfg
# config command will be used to track files in ~
function config {
   /usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME $@
}
mkdir -p .config-backup
# pull all files into ~
config checkout
if [ $? = 0 ]; then
  echo "Checked out config.";
  else
	# merge conflicts due to pre-existing dot files, move them to a backup directory
    echo "Backing up pre-existing dot files.";
    config checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | xargs -I{} mv {} .config-backup/{}
fi;
# rety checkout in case of failure
config checkout
# make 'config status' command not overwhelming
config config status.showUntrackedFiles no
