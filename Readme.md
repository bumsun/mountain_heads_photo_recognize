# Приложение для Хакатона Innotech Hack.
------
Мы сделали веб приложение на React JS и сервер на Python для анализа людей из ВКонтакте.

1) Рабочий рототип сервиса - http://138.68.64.84/
2) Презентация - https://www.figma.com/file/bXZvedwRm5JsdZGkzqY2Vn/Mountain-heads?node-id=0%3A1

## Более подробно что было сделано за время Хакатона:
1) Автоматизировали сбор фич из групп. Даже из скрытых. Cбор фич из фоток, с помощью Google Vision Api, который определяет содержание фотографий(машины, квартиры, путешествия и т.д.) и геоточки на карте, в которых они сняты. По этим фичам определяем услуги банка, которые могут подойти. Для учета платежеспособности учитывается 200 признков выявленных из групп и фотографий.
> Файл, в котром можно подробно увидеть, какие признаки из фотографий и групп сильнее влияют на платежеспособность - https://github.com/bumsun/mountain_heads_photo_recognize/blob/main/weights.py
2) Получаем всю открытую необходимую инфу из вк. С помощью метода https://vk.com/dev/users.get
3) Сделали определение скрытого семеного положения и определение скрытого возраста в ВК, с помощью двоичного поиска и метода https://vk.com/dev/users.search
4) Определяем на терроризм, через парсинг сайта  http://www.fedsfm.ru/documents/terrorists-catalog-portal-act?roistat_visit=98889
5) Определяем Постановления о взыскании, через API сайта https://fssp.gov.ru
6) Релизовали обучение базы по фоткам и последующий поиск, через библиотеку https://github.com/davisking/dlib

## Особенности при тестировании:
1) Скорость загрузки базы для обучения. Для 20 фотографий может потребоваться от 20 до 30 секунд.
2) После загрузки фотки и успешного поиска человека в ВК, данные загружаются постепенно. Дольше всего работает алгоритм по анализу фотографий, алгоритм работает так, что выгружает последние 30 фотографий со стены и прогоняет через Google Vision Api и определяются обьекты из фотографий, а так же широта и долгота места съемки. Таким образом вычисляется страна и можно понять, может ли человек себе позволить путешествовать.
3) Платежеспособность селовека складывается из Пабликов, в которых он состоит и из признаков, которые мы извлекли из фотографий.
4) Обратите внимание, что у нас есть фича, которая раскрывает возраст и семейное положение человека, даже если он скрыл их.


