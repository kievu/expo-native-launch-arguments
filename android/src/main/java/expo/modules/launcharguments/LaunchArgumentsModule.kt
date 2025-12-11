package expo.modules.launcharguments

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class LaunchArgumentsModule : Module() {
  companion object {
    private const val DETOX_LAUNCH_ARGS_KEY = "launchArgs"
  }

  override fun definition() = ModuleDefinition {
    Name("LaunchArguments")

    Constants {
      mapOf("value" to parseIntentExtras())
    }
  }

  private fun parseIntentExtras(): Map<String, Any?> {
    val map = mutableMapOf<String, Any?>()

    val activity = appContext.currentActivity ?: return map
    val intent = activity.intent ?: return map

    parseDetoxExtras(map, intent)
    parseADBArgsExtras(map, intent)

    return map
  }

  private fun parseDetoxExtras(map: MutableMap<String, Any?>, intent: android.content.Intent) {
    val bundle = intent.getBundleExtra(DETOX_LAUNCH_ARGS_KEY)
    bundle?.let {
      for (key in it.keySet()) {
        map[key] = it.getString(key)
      }
    }
  }

  private fun parseADBArgsExtras(map: MutableMap<String, Any?>, intent: android.content.Intent) {
    val bundleExtras = intent.extras ?: return

    for (key in bundleExtras.keySet()) {
      if (key != DETOX_LAUNCH_ARGS_KEY && key != "android.nfc.extra.NDEF_MESSAGES") {
        val value = bundleExtras.get(key)
        map[key] = when (value) {
          is Int, is Double, is Boolean, is String -> value
          else -> bundleExtras.getString(key)
        }
      }
    }
  }
}

