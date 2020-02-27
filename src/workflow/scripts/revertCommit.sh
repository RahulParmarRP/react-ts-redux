#!/bin/bash

set -e

REPO_FULLNAME=$(jq -r ".repository.full_name" "$GITHUB_EVENT_PATH") ;

if [[ -z "$GITHUB_TOKEN" ]]; then
	echo "Set the GITHUB_TOKEN env variable." ;
	exit 1 ;
fi

git remote set-url origin https://x-access-token:$GITHUB_TOKEN@github.com/$REPO_FULLNAME.git ;
git config --global user.email "revert@github.com" ;
git config --global user.name "GitHub Revert Action" ;

set -o xtrace

git fetch origin $HEAD_BRANCH ;

# do the revert
git checkout -b $HEAD_BRANCH origin/$GITHUB_REF ;

# check commit exists
git cat-file -t $GITHUB_SHA ;
git revert -m 1 $GITHUB_SHA --no-edit ;
git push origin HEAD:$BRANCH_NAME ;
