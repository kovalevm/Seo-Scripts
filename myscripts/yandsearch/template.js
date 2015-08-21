<div id="mk" style="width:500px;">
    <div class="bold-words-div">
        <h3><em>Подсвеченные слова:</em></h3>
        <p class="bold-words"> ${boldWords} </p>
    </div>
    <div class="issue">
        <br><span>Каталогов: ${catalogies}</span>
        <br><span>Главная/Внутренная: ${mains}/${internals}</span>
        <ol style="padding-left: 15px;">

            {{ each $snippets }}

            <li class="{{if $value.isBadPage}} bad-li-ol {{/if}} li-ol">
                <h3> ${$value.title} </h3>
                <input type="checkbox" class="checkbox-ol" checked="{{if $value.isBadPage}} checked {{/if}}"> {{if $value.main}} Гл {{else}} Вн {{/if}} - <a class="a-ol" target="_blank" href=" ${$value.url} ">${$value.url}</a>
            </li>

            {{/each}}


        </ol>
        <button type="button" id="btnOpenIssueLinks" onclick="openTabs();">Открыть отмеченные страницы</button>
    </div>
</div>
