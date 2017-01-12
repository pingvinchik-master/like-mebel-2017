var        gulp = require('gulp'),
           less = require('gulp-less'), //less � css
          watch = require('gulp-watch'),//������������ ��������� ����
    browserSync = require('browser-sync'),//�������������� � ��������
         concat = require('gulp-concat'), //����������� ������
		cssnano = require('gulp-cssnano'), //����������� css-������
		 rename = require('gulp-rename'), //�������������� �����
		 uglify = require('gulp-uglifyjs'), //������ js-������
   autoprefixer = require('gulp-autoprefixer'); //���������� ��������� ���������

   
gulp.task('autoprefixer', function(){
  return gulp.src('app/css/style.css')
	.pipe(autoprefixer({
	  browsers: ['last 10 versions']
	}))
	.pipe(gulp.dest('app/css/style.css'));
});



//��������� less � css
gulp.task('less', function() {
  return gulp.src('app/block-styles/*.less') 
    .pipe(concat('style.less'))  
    .pipe(less())
	.pipe(autoprefixer())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css/'))
});




//����������� ��������� ������ ��� �������������� ��������
gulp.task('browser-sync', function() {
  browserSync({
    server: { // ���������� ��������� �������
    baseDir: 'app' // ���������� ��� ������� - app
    },
    notify: false // ��������� �����������
  });
});

//���������� � ������������ ����� ��������� ��������
gulp.task('scripts' , function() {
  return gulp.src([
    'app/libs/fancybox/source/jquery.fancybox.pack.js',
	'app/libs/slick/slick/slick.min.js'
  ])
  .pipe(concat('libs.min.js'))  
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
});

//��������� ������������ ��������� � ������
gulp.task('watch', ['browser-sync', 'less'], function() {
  gulp.watch('app/block-styles/*.less', ['less'], browserSync.reload);
  gulp.watch('app/css/style.css', browserSync.reload);	
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);  
});



gulp.task('default', ['watch', 'browserSync']);



//��� �������������� ��������� ���� ��� ������ �� �������
//�������� � ��������
//������� �����
//����������� �����������
//��� ��� ��������
//��������� ����