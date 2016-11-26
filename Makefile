clean:
	rm -rf build

build: clean
	mkdir build
	NODE_ENV=production webpack --config ./configs/webpack.production.config.js
	cp ./src/index.html ./build/index.html

deploy: build
	git stash
	git branch -f gh-pages
	git checkout gh-pages
	git reset --hard origin/master
	cp -r build/* .
	git add -A .
	git commit -a -m 'gh-pages update'
	git push origin gh-pages --force
	git checkout master
	git stash apply
